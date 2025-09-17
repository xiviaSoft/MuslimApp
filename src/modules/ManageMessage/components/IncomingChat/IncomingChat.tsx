import { Box, Paper, Typography } from "@mui/material";

interface IncomingChatProps {
  senderMsg: string
}
const IncomingChat = ({ senderMsg }: IncomingChatProps) => {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      px={2}
      py={1}
    >
      <Paper
        elevation={0}
        sx={{
          // width: "100%",
          maxWidth: '80%',
          padding: "8px 12px",
          borderRadius: "12px 12px 12px 0px",
          whiteSpace: "pre-line",

        }}
      >
        <Typography variant="body2">
          {senderMsg}
        </Typography>
      </Paper>
    </Box>
  );
};

export default IncomingChat;
