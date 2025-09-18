import * as React from "react";

import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import { COLORS } from "@muc/constants";
import MessageCard from "../../components/UserMessageCard/UserMessageCard";
import ShowUserDetailPath from "../../components/ShowUserDetailPath/ShowUserDetailPath";
import ChatBox from "../../components/ChatBox/ChatBox";
import SendingChatTextField from "../../components/SendingChatTextField/SendingChatTextField";

import { auth, db, } from "@muc/libs";
import { useParams } from "react-router";
import { UserMessages } from "@muc/hooks";
import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";



const MessageContainer = () => {
  const [value, setValue] = React.useState(0);
  const { id: otherUid } = useParams();
  const myUid = auth.currentUser?.uid;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data: messages, isLoading } = UserMessages(myUid!, otherUid!);


  const { data: chatUsers } = useQuery({
    queryKey: ["chatUsers", myUid],
    queryFn: async () => {
      if (!myUid) return [];
      const q = query(
        collection(db, "dms"),
        where("participants", "array-contains", myUid)
      );
      const snapshot = await getDocs(q);

      const chats = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          const otherUid = data.participants.find((uid: string) => uid !== myUid);

          let userProfile = null;
          if (otherUid) {
            const userDoc = await getDoc(doc(db, "users", otherUid));
            if (userDoc.exists()) {
              userProfile = userDoc.data();
            }
          }

          return {
            id: docSnap.id,
            ...data,
            otherUid,
            otherUser: userProfile,
          };
        })
      );

      return chats;
    },
    enabled: !!myUid,
  });


  const activeChat = chatUsers?.find((chat: any) => chat.otherUid === otherUid);


  const { data: fallbackUser } = useQuery({
    queryKey: ["userProfile", otherUid],
    queryFn: async () => {
      if (!otherUid) return null;
      const userDoc = await getDoc(doc(db, "users", otherUid));
      return userDoc.exists() ? userDoc.data() : null;
    },
    enabled: !!otherUid && !activeChat,
  });

  const displayedUser = activeChat?.otherUser || fallbackUser;

  return (
    <React.Fragment>

      <Box sx={{

        width: "100%", display: "flex"
      }}>

        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Message Dialog Tabs"
            centered
            sx={{
              width: "300px",
              pt: "30px",
              background: "linear-gradient(to bottom,#f5f5f5 0,#e8e8e8 100%)",
              ".MuiTabs-indicator": {
                top: 0,
                bottom: "auto",
                color: COLORS.secondary.main,
              },
            }}
          >
            <Tab
              label="All Messages"
              sx={{
                border: "1px solid #ccc",
                bgcolor: value === 0 ? "white" : "inherit",
                width: "140px",
                fontSize: "12px",
                color: COLORS.secondary.main,
                padding: "5px",
              }}
            />
            <Tab
              label="Unread"
              sx={{
                border: "1px solid #ccc",
                bgcolor: value === 1 ? "white" : "inherit",
                width: "140px",
                fontSize: "12px",
                color: COLORS.secondary.main,
                padding: "5px",
              }}
            />
          </Tabs>
          <Box
            sx={{
              bgcolor: COLORS.gray.whiteGray,

              color: COLORS.secondary.main,
              padding: "10px",
              textAlign: "end",
            }}
          >
            <Typography sx={{ cursor: "pointer" }}>Edit</Typography>
          </Box>
          {value === 0 && (
            <>
              {(!chatUsers || chatUsers.length === 0) ? (
                <Typography>you and no friend</Typography>
              ) : (
                chatUsers?.map((chat: any) => (
                  <MessageCard
                    key={chat.id}
                    firstName={chat.otherUser?.firstName ?? ""}
                    lastName={chat.otherUser?.lastName ?? ""}
                    lastMessageText={chat.lastMessageText ?? ""}
                    uid={chat.otherUid}
                  />
                ))
              )}
            </>
          )}
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: COLORS.gray.main, height: "602px" }}
        />
        <Stack
          width={"100%"}
        >
          {otherUid && displayedUser && (
            <ShowUserDetailPath
              firstName={displayedUser.firstName ?? ""}
              lastName={displayedUser.lastName ?? ""}
            />
          )}


          <ChatBox messages={messages ?? []} isLoading={isLoading} />

          {myUid && otherUid && <SendingChatTextField meUid={myUid} otherUid={otherUid} />}
        </Stack>

      </Box>

    </React.Fragment>
  );
};

export default MessageContainer;
