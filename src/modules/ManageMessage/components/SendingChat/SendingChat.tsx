import { COLORS } from "@muc/constants";
import { Done } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";


interface SendeingChatProps {
  sendedMsg: string
}

const SendingChat = ({ sendedMsg }: SendeingChatProps) => {
  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
          <Stack
            sx={{
              bgcolor: COLORS.blue.bluelight,
              color: COLORS.white.main,
              padding: "5px 10px",
              // borderRadius: "10px",
              borderRadius: "12px 12px 0px 12px",
              margin: "10px",
              // maxWidth: "60%",
              ml: "auto",
              width: '80%',
              textWrap:'wrap',
              wordBreak: "break-word",
            }}  >
            <Typography
            >{sendedMsg}

            </Typography>
            <Done sx={{ fontSize: "15px", ml: "auto" }} />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default SendingChat;
