import { Stack } from "@mui/material";
import LogingWithEmail from "../../components/LogingWithEmail/LogingWithEmail";

import AuthLayout from "../../AuthLayout/AuthLayout";

const LogingContainer = () => {
  return (
    <AuthLayout>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3, md: 5 }}
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <LogingWithEmail />
        {/* <LoginwithNumber /> */}
      </Stack>
    </AuthLayout>
  );
};

export default LogingContainer;
