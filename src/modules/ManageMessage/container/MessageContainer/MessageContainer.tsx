import * as React from "react";

import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import { COLORS } from "@muc/constants";
import MessageCard from "../../components/UserMessageCard/UserMessageCard";
import ShowUserDetailPath from "../../components/ShowUserDetailPath/ShowUserDetailPath";
import ChatBox from "../../components/ChatBox/ChatBox";
import SendingChatTextField from "../../components/SendingChatTextField/SendingChatTextField";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@muc/libs";
import { useParams } from "react-router";
import { UserMessages } from "@muc/hooks";



const MessageContainer = () => {
  const [value, setValue] = React.useState(0);
  const { id: otherUid } = useParams()

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // const { data } = useQuery({
  //   queryKey: ["messages",],
  //   queryFn: async () => {
  //     const snapshot = await getDocs(collection(db, "dms"));
  //     return snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //   },
  // });

  const myUid = auth.currentUser?.uid

  const { data: messages, isLoading } = UserMessages(myUid!, otherUid!);




  console.log(messages, 'this is the data of the threads')

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
              <MessageCard firstName="ali" lastName="khan" lastMessageText="how are you" />
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
          <ShowUserDetailPath firstName="ali" lastName="khan" />

          <ChatBox messages={messages ?? []} isLoading={isLoading} />

          {myUid && otherUid && <SendingChatTextField meUid={myUid} otherUid={otherUid} />}
        </Stack>

      </Box>

    </React.Fragment>
  );
};

export default MessageContainer;
