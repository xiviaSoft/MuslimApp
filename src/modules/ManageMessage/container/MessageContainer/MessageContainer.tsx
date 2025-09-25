// pages/messages/MessageContainer.tsx
import * as React from "react";
import { Box, Stack, Typography, Paper } from "@mui/material";
import { COLORS } from "@muc/constants";
import MessageCard from "../../components/UserMessageCard/UserMessageCard";
import ShowUserDetailPath from "../../components/ShowUserDetailPath/ShowUserDetailPath";
import ChatBox from "../../components/ChatBox/ChatBox";
import SendingChatTextField from "../../components/SendingChatTextField/SendingChatTextField";

import { auth, db } from "@muc/libs";
import { useParams } from "react-router";
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

const MessageContainer = () => {
  const { id: otherUid } = useParams();
  const myUid = auth.currentUser?.uid;
  const { markThreadAsRead } = useMarkAsRead();

  const [chatUsers, setChatUsers] = React.useState<any[]>([]);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // 🔹 unread count hook
  const { total, chats: unreadChats = [] } = UseUnreadCount(myUid);

  // 🔹 Listen to all chat threads in realtime
  React.useEffect(() => {
    if (!myUid) return;

    const q = query(collection(db, "dms"), where("participants", "array-contains", myUid));

    const unsub = onSnapshot(q, async (snapshot) => {
      const chats = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          const other = data.participants.find((uid: string) => uid !== myUid);

          let userProfile = null;
          if (other) {
            const userDoc = await getDoc(doc(db, "users", other));
            if (userDoc.exists()) {
              userProfile = userDoc.data();
            }
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

  // 🔹 Listen to active chat messages in realtime
  React.useEffect(() => {
    if (!myUid || !otherUid) return;

    const q = query(
      collection(db, "dms", [myUid, otherUid].sort().join("_"), "messages"),
      orderBy("sentAt", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsub();
  }, [myUid, otherUid]);

  // 🔹 Merge unread counts into chat list
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

  // 🔹 Mark active thread as read when opened
  React.useEffect(() => {
    if (!myUid || !activeChat?.id) return;
    markThreadAsRead(activeChat.id, myUid);
  }, [myUid, activeChat?.id, markThreadAsRead]);

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
      }}
    >
      {/* Sidebar */}
      <Paper
        elevation={0}
        sx={{
          width: 320,
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

      {/* Active chat */}
      <Stack sx={{ flex: 1, display: "flex", flexDirection: "column", bgcolor: COLORS.gray.whiteGray }}>
        {otherUid && activeChat?.otherUser && (
          <ShowUserDetailPath
            firstName={activeChat.otherUser.firstName ?? ""}
            lastName={activeChat.otherUser.lastName ?? ""}
          />
        )}

        <ChatBox threadId={activeChat?.id ?? ""} messages={messages} isLoading={loading} />

        {myUid && otherUid && (
          <SendingChatTextField meUid={myUid} otherUid={otherUid} />
        )}
      </Stack>
    </Box>
  );
};

export default MessageContainer;
