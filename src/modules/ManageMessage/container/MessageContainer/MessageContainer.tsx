import * as React from "react";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Divider,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { COLORS } from "@muc/constants";
import MessageCard from "../../components/UserMessageCard/UserMessageCard";
import ShowUserDetailPath from "../../components/ShowUserDetailPath/ShowUserDetailPath";
import ChatBox from "../../components/ChatBox/ChatBox";
import SendingChatTextField from "../../components/SendingChatTextField/SendingChatTextField";
import { auth, db } from "@muc/libs";
import { useParams, useNavigate } from "react-router";
import { useMarkAsRead, UseUnreadCount } from "@muc/hooks";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

const MessageContainer = () => {
  const { id: otherUid } = useParams();
  const navigate = useNavigate();
  const myUid = auth.currentUser?.uid;
  const { markThreadAsRead } = useMarkAsRead();
  const isMobile = useMediaQuery("(max-width:600px)"); // ✅ Only for mobile

  const [chatUsers, setChatUsers] = React.useState<any[]>([]);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const { total, chats: unreadChats = [] } = UseUnreadCount(myUid);

  // 🔹 Check mutual block status
  const { data: isBlocked, isLoading: isBlockedLoading } = useQuery({
    queryKey: ["mutualBlockedStatus", myUid, otherUid],
    queryFn: async () => {
      if (!myUid || !otherUid) return false;
      const [myDoc, otherDoc] = await Promise.all([
        getDoc(doc(db, "users", myUid)),
        getDoc(doc(db, "users", otherUid)),
      ]);
      if (!myDoc.exists() || !otherDoc.exists()) return false;

      const myBlocked = myDoc.data().blocked || [];
      const otherBlocked = otherDoc.data().blocked || [];

      return myBlocked.includes(otherUid) || otherBlocked.includes(myUid);
    },
    enabled: !!myUid && !!otherUid,
  });

  // 🔹 Listen to all chat threads
  React.useEffect(() => {
    if (!myUid) return;
    const q = query(
      collection(db, "dms"),
      where("participants", "array-contains", myUid)
    );

    const unsub = onSnapshot(q, async (snapshot) => {
      const chats = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          const other = data.participants.find((uid: string) => uid !== myUid);

          let userProfile = null;
          if (other) {
            const userDoc = await getDoc(doc(db, "users", other));
            if (userDoc.exists()) userProfile = userDoc.data();
          }

          return {
            id: docSnap.id,
            ...data,
            otherUid: other,
            otherUser: userProfile,
          };
        })
      );
      setChatUsers(chats);
    });

    return () => unsub();
  }, [myUid]);

  // 🔹 Listen to messages in active chat
  React.useEffect(() => {
    if (!myUid || !otherUid) return;
    const q = query(
      collection(db, "dms", [myUid, otherUid].sort().join("_"), "messages"),
      orderBy("sentAt", "asc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, [myUid, otherUid]);

  // 🔹 Merge unread counts
  const enrichedChats = React.useMemo(() => {
    const base = chatUsers ?? [];
    const getTime = (t: any) => {
      if (!t) return 0;
      if (typeof t.toMillis === "function") return t.toMillis();
      if (t.seconds) return t.seconds * 1000 + (t.nanoseconds || 0) / 1e6;
      if (t instanceof Date) return t.getTime();
      return 0;
    };

    const merged = base.map((chat: any) => {
      const unreadChat = unreadChats.find((x: any) => x.id === chat.id);
      return {
        ...chat,
        unread: unreadChat?.unread ?? 0,
        lastReadAt: unreadChat?.lastReadAt,
      };
    });
    merged.sort((a: any, b: any) => getTime(b.lastMessageAt) - getTime(a.lastMessageAt));
    return merged;
  }, [chatUsers, unreadChats]);

  const activeChat = enrichedChats?.find((chat: any) => chat.otherUid === otherUid);

  // 🔹 Mark thread as read
  React.useEffect(() => {
    if (!myUid || !activeChat?.id) return;
    markThreadAsRead(activeChat.id, myUid);
  }, [myUid, activeChat?.id, markThreadAsRead]);

  const handleBack = () => {
    navigate("/messages");
  };

  const showChat = !isMobile || (isMobile && otherUid);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "85vh",
        bgcolor: COLORS.gray.lightDarkGray,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >

      {(!isMobile || !otherUid) && (
        <Paper
          elevation={0}
          sx={{
            width: isMobile ? "100%" : 320,
            borderRight: `1px solid ${COLORS.gray.main}`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 16, color: COLORS.gray.darkGray }}>
              Chats {total > 0 ? `(${total})` : ""}
            </Typography>
          </Box>
          <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>
            {!enrichedChats || enrichedChats.length === 0 ? (
              <Typography sx={{ textAlign: "center", color: COLORS.gray.darkGray, py: 5 }}>
                You have no chats yet
              </Typography>
            ) : (
              enrichedChats.map((chat: any) => (
                <MessageCard
                  key={chat.id}
                  firstName={chat.otherUser?.firstName ?? ""}
                  lastName={chat.otherUser?.lastName ?? ""}
                  lastMessageText={chat.lastMessageText ?? ""}
                  uid={chat.otherUid}
                  threadId={chat.id}
                  unread={chat.unread ?? 0}
                  isActive={chat.otherUid === otherUid}
                />
              ))
            )}
          </Box>
        </Paper>
      )}

      {/* Chat Area */}
      {showChat && (
        <Stack
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            bgcolor: COLORS.gray.whiteGray,
            position: "relative",
          }}
        >
          {/* Floating back button for mobile */}
          {isMobile && (
            <IconButton
              onClick={handleBack}
              sx={{
                position: "absolute",
                top: 35,
                right: 17,
                zIndex: 10,
                bgcolor: COLORS.gray.whiteGray,
         
                boxShadow: 1,
                "&:hover": { bgcolor: "white" },
              }}
            >
              <ArrowBackIcon sx={{       fontSize:'20px',}} />
            </IconButton>
          )}

          {/* Chat Header */}
          {otherUid && activeChat?.otherUser && (
            <>
              <Stack direction="row" alignItems="center" spacing={1} sx={{
                 px: {md:5,xs:2}, py: 1 
                 }}>
                <ShowUserDetailPath
                  firstName={activeChat.otherUser.firstName ?? ""}
                  lastName={activeChat.otherUser.lastName ?? ""}
                />
              </Stack>
              <Divider sx={{ my: 1 }} />
            </>
          )}

          {/* Chat Messages */}
          <ChatBox
            threadId={activeChat?.id ?? ""}
            messages={messages}
            isLoading={loading}
          />

          {/* Chat Input */}
          {myUid && otherUid ? (
            isBlockedLoading ? (
              <Typography sx={{ textAlign: "center", color: "gray", py: 2 }}>
                Loading...
              </Typography>
            ) : isBlocked ? (
              <Typography sx={{ textAlign: "center", color: "red", py: 2 }}>
                You cannot send messages because one of you has blocked the other.
              </Typography>
            ) : (
              <SendingChatTextField meUid={myUid} otherUid={otherUid} />
            )
          ) : (
            <Typography sx={{ textAlign: "center", color: "red", py: 2 }}>
              You cannot send messages.
            </Typography>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default MessageContainer;
