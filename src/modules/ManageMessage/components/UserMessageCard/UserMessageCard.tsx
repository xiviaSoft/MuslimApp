import { COLORS } from "@muc/constants";
import { Close, MoreHoriz } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";


interface UserMessageCardProps {
  firstName: string;
  lastName: string;
  lastMessageText: string;
}

const UserMessageCard = ({ firstName, lastMessageText, lastName }: UserMessageCardProps) => {
  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          width: "300px",
          padding: "10px",
          height: "70px",
          gap: "15px",
          // boxShadow: `0 5px 5px  ${COLORS.gray.darkGray}`,
          borderBottom: "#d3d3d3 solid 1px",
        }}
      >
        <Box
          component={"img"}
          src="/assets/images/girl-img.jpg"
          sx={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <Stack>
          <Typography sx={{ color: COLORS.green.lightGreen }}>
            {firstName} {lastName}
          </Typography>
          <Typography
            variant="body2"
            fontSize={"11px"}
            color={COLORS.gray.darkGray}
          >
            {lastMessageText}
          </Typography>
        </Stack>
        <Stack
          sx={{
            justifyContent: "space-around",
            alignItems: "end",
            ml: "auto",
          }}
        >
          <Close sx={{ fontSize: "16px" }} />
          <MoreHoriz sx={{ fontSize: "20px" }} />
          <Typography sx={{ fontSize: "10px" }}>Firday</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default UserMessageCard;
