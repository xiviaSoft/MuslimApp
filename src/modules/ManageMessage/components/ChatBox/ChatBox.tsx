import { COLORS } from "@muc/constants";
import { Box, Stack, Typography } from "@mui/material";
import IncomingChat from "../IncomingChat/IncomingChat";
import SendingChat from "../SendingChat/SendingChat";
import { auth } from "@muc/libs";

interface ChatBoxProps {
  messages: any[];
  isLoading: boolean;
}


const ChatBox = ({ messages, isLoading }: ChatBoxProps) => {
  if (isLoading) return <p>Loading...</p>;
  // if (!messages?.length) return <p style={{ padding: "16px" }}>No messages yet</p>;

  console.log(messages, 'this is messages in the chat')
  return (
    <Stack
      sx={{
        bgcolor: COLORS.gray.whiteGray,
        height: "60vh",
        overflowY: "auto",
        padding: "10px 16px 26px",
        width: "100%",
        display: "flex",
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: COLORS.primary.main,
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: COLORS.gray.darkGray,
        },
      }}
    >


      {!messages?.length ? (<Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}> No messages yet</Typography>) : (
        messages.map((msg) => {
          const isMe = msg.senderId === auth.currentUser?.uid;

          return (
            <Box key={msg.id} sx={{ display: "flex", flexDirection: "column" }}>
              {isMe ? (
                <Box sx={{ display: "flex", alignSelf: "end" }}>
                  <SendingChat sendedMsg={msg.text} />
                </Box>
              ) : (
                <IncomingChat senderMsg={msg.text} />
              )}
            </Box>
          );
        })
      )}


      {/* Example of grouping by day (like "Today") – optional */}
      {/* <Typography
        sx={{
          bgcolor: COLORS.dark.grayblack,
          color: COLORS.white.main,
          marginY: "20px",
          width: "125px",
          mx: "auto",
          textAlign: "center",
          fontSize: "10px",
          borderRadius: "10px",
          padding: "2px",
        }}
      >
        {messages}
      </Typography> */}
    </Stack >
  );
};

export default ChatBox;
