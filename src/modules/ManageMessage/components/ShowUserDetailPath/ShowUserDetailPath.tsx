import { COLORS, ROUTES } from "@muc/constants";
import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ShowUserDetailPathProps {
  firstName: string;
  lastName: string;
  uid?: string; // 👈 Add uid prop
}

const ShowUserDetailPath = ({
  firstName,
  lastName,
  uid,
}: ShowUserDetailPathProps) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (uid) {
      navigate(`/${ROUTES.USER_INFO}/${uid}`); // 👈 Navigate to profile
    }
  };

  return (
    <>
      <Stack
        direction={"row"}
        onClick={handleProfileClick} // 👈 Add click handler
        sx={{
          // background: "linear-gradient(to bottom,#f5f5f5 0,#e8e8e8 100%)",
          width: "100%",
          // flexFlow: 1,
          display: "flex",
          alignItems: "center",
          // justifyContent: {sm:'start',xs:'center'},
          height: "100px",
          gap: "16px",
          p: "16px",
          border: "#d3d3d3 solid 1px",
          cursor: uid ? "pointer" : "default", // 👈 specific cursor
          "&:hover": uid ? { bgcolor: COLORS.gray.lightDarkGray } : {}, // 👈 hover effect
        }}
      >
        <Box
          component={"img"}
          src="/assets/images/girl-img.jpg"
          sx={{
            width: { md: "70px", xs: "40px" },
            height: { md: "70px", xs: "40px" },
            borderRadius: "50%",
          }}
        />
        <Stack>
          <Typography
            variant="h2"
            sx={{
              color: COLORS.green.lightGreen,
              fontWeight: 500,
              fontSize: { md: "24px", xs: "18px" },
            }}
          >
            {firstName} {lastName}
          </Typography>
          {/* <Typography
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: "400px",
              whiteSpace: "nowrap",
              color: COLORS.dark.darkblack,
            }}
          >
            Administrator / -- / Just Muslim / Avon / United Kingdom
          </Typography> */}
        </Stack>
      </Stack>
    </>
  );
};

export default ShowUserDetailPath;
