
import { COLORS } from "@muc/constants";
import { auth } from "@muc/libs";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import SendingChat from "../SendingChat/SendingChat";
import { Delete } from "@mui/icons-material";
import IncomingChat from "../IncomingChat/IncomingChat";
import { useDeleteMessage } from "@muc/hooks";

interface ChatBoxProps {
  threadId: string;
  messages: any[];
  isLoading: boolean;
}
const ChatBox = ({ threadId, messages, isLoading }: ChatBoxProps) => {
  const { mutate: deleteMessage } = useDeleteMessage(threadId);

  if (isLoading) return <Typography
    sx={{
      height: '100vh',
      width: "100%",
      display: 'grid',
      placeItems: 'center'
    }}>
    You have no messages
  </Typography>;

  return (
    <Stack
      sx={{
        bgcolor: COLORS.gray.whiteGray,
        height: !messages?.length ? "100vh" : "60vh",
        overflowY: "auto",
        padding: "10px 16px 26px",
        width: "100%",
        display: "flex",
        "&::-webkit-scrollbar": { width: "4px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: COLORS.primary.main,
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": { backgroundColor: COLORS.gray.darkGray },
      }}
    >
      {!messages?.length ? (
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          No messages yet
        </Typography>
      ) : (
        messages.map((msg) => {
          const isMe = msg.senderId === auth.currentUser?.uid;

          return (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                "&:hover .delete-btn": { opacity: 1 },
              }}
            >
              {isMe ? (
                <Box sx={{ display: "flex", alignSelf: "end", alignItems: "center" }}>
                  <SendingChat sendedMsg={msg.text} />
                  {/* <IconButton
                    size="small"
                    onClick={() => deleteMessage(msg.id)} // 👈 mutation
                    className="delete-btn"
                    sx={{
                      ml: 1,
                      opacity: 0,
                      transition: "opacity 0.2s",
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton> */}
                </Box>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IncomingChat senderMsg={msg.text} />
                </Box>
              )}
            </Box>
          );
        })
      )}
    </Stack>
  );
};

export default ChatBox