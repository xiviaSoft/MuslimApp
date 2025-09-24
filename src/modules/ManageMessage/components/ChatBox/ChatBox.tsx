import { COLORS } from "@muc/constants";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IncomingChat from "../IncomingChat/IncomingChat";
import SendingChat from "../SendingChat/SendingChat";
import { auth, db } from "@muc/libs";
import { deleteDoc, doc } from "firebase/firestore";

interface ChatBoxProps {
  threadId: string; // thread id for deletion
  messages: any[];
  isLoading: boolean;
}

const ChatBox = ({ threadId, messages, isLoading }: ChatBoxProps) => {
  if (isLoading) return <p>Loading...</p>;

  // 🔹 Delete message function
  const handleDelete = async (msgId: string) => {
    try {
      await deleteDoc(doc(db, "dms", threadId, "messages", msgId));
      console.log("Message deleted:", msgId);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

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
                "&:hover .delete-btn": { opacity: 1 }, // 👈 show delete button on hover
              }}
            >
              {isMe ? (
                <Box sx={{ display: "flex", alignSelf: "end", alignItems: "center" }}>
                  <SendingChat sendedMsg={msg.text} />
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(msg.id)}
                    className="delete-btn"
                    sx={{
                      ml: 1,
                      opacity: 0, // hidden by default
                      transition: "opacity 0.2s",
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IncomingChat senderMsg={msg.text} />
                  {/* Uncomment if you want delete for others' messages */}
                  {/* <IconButton
                    size="small"
                    onClick={() => handleDelete(msg.id)}
                    className="delete-btn"
                    sx={{
                      ml: 1,
                      opacity: 0,
                      transition: "opacity 0.2s",
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton> */}
                </Box>
              )}
            </Box>
          );
        })
      )}
    </Stack>
  );
};

export default ChatBox;
