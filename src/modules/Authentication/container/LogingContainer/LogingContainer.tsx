import { Box, Stack } from "@mui/material";
import LogingWithEmail from "../../components/LogingWithEmail/LogingWithEmail";
import LoginwithNumber from "../../components/LoginwithNumber/LoginwithNumber";
import { CustomSlider } from "@muc/components";
import AuthLayout from "../../AuthLayout/AuthLayout";

const LogingContainer = () => {
  return (
    // <Box>
    //   <Box sx={{ position: "relative" }}>
    //     <CustomSlider />
    //     <Stack
    //       direction={"row"}
    //       sx={{
    //         position: "absolute",
    //         top: "50%",
    //         left: "50%",
    //         transform: "translate(-50%, -50%)",
    //       }}
    //     >
    <AuthLayout>

          <LogingWithEmail />
          <LoginwithNumber />
    </AuthLayout>
    //     </Stack>
    //   </Box>
    // </Box>
  );
};

export default LogingContainer;
