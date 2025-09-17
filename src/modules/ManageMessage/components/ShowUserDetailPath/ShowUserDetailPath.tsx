import { COLORS } from "@muc/constants";
import { Box, Stack, Typography } from "@mui/material";

interface ShowUserDetailPathProps {
  firstName: string;
  lastName: string;
}


const ShowUserDetailPath = ({ firstName, lastName }: ShowUserDetailPathProps) => {
  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          background: "linear-gradient(to bottom,#f5f5f5 0,#e8e8e8 100%)",
          width: "100%",
          // flexFlow: 1,
          height: "100px",
          gap: "16px",
          p: "16px",
          border: "#d3d3d3 solid 1px",
        }}
      >
        <Box
          component={"img"}
          src="/assets/images/girl-img.jpg"
          sx={{ width: "70px", height: "70px", borderRadius: "50%" }}
        />
        <Stack>
          <Typography
            variant="h2"
            sx={{ color: COLORS.green.lightGreen, fontWeight: 500 }}
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
