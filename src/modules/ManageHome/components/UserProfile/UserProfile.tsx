import { COLORS } from "@muc/constants";
import {
  AccountBox,
  NotificationAdd,
  PhotoAlbum,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import LiveAndHideSwitch from "../LiveAndHideSwitch/LiveAndHideSwitch";
import { CustomButton } from "@muc/components";

const UserProfile = () => {
  const Navigate = useNavigate();
  return (
    <>
      <Box
        component={Paper}
        width={"100%"}
        sx={{ padding: "21px 0", height: "385px", mb: "10px" }}
      >
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            px: "20px",
          }}
        >
          <CustomButton
            title="Logout"
            variant="outlined"
            onClick={() => {}} // Add logout logic if available
            color={COLORS.red.main}
            background="transparent"
            height="25px"
            width="80px"
          />
          <Box display="flex" alignItems="center" gap={2}>
            <LiveAndHideSwitch />
          </Box>
        </Stack>

        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "30px",
          }}
        >
          <Box
            component={"img"}
            src="/assets/images/UserImg.jpg"
            alt="UserProfile"
            sx={{ width: "140px", height: "140px", borderRadius: "50%" }}
          />
          <Typography
            sx={{ color: COLORS.secondary.main, pt: "23px", fontSize: "24px" }}
          >
            UserName.........23
          </Typography>
          <Rating
            size="medium"
            sx={{ color: COLORS.secondary.main, pb: "15px", pt: "8px" }}
          />
        </Stack>

        <Stack direction={"row"} justifyContent={"space-around"}>
          {UserData.map((item) => (
            <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
              <IconButton onClick={() => Navigate(item.path)}>
                {item.icon}
              </IconButton>
              <Typography fontSize={"10px"}>{item.title}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default UserProfile;

const UserData = [
  {
    icon: (
      <AccountBox sx={{ color: COLORS.secondary.main, fontSize: "32px" }} />
    ),
    title: "Edit profile",
    path: "/user_setting/edit-profile",
  },
  {
    icon: (
      <PhotoAlbum sx={{ color: COLORS.secondary.main, fontSize: "32px" }} />
    ),
    title: "My Photos",
    path: "/user_setting/edit-photos",
  },
  {
    icon: <Settings sx={{ color: COLORS.secondary.main, fontSize: "32px" }} />,
    title: "Preferences",
    path: "/user_setting/edit-profile",
  },
  {
    icon: (
      <NotificationAdd
        sx={{ color: COLORS.secondary.main, fontSize: "32px" }}
      />
    ),
    title: "Notifications",
    path: "/user_setting/notifications",
  },
];
