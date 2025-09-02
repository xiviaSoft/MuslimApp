import { CustomButton, CustomTextField } from "@muc/components";
import { COLORS } from "@muc/constants";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

const ChangePassword = () => {
  const methods = useForm();
  return (
    <>
      <Typography
        variant="h6"
        fontSize={"24px"}
        color={COLORS.gray.darkGray}
        mb={"21px"}
      >
        Change Password
      </Typography>
      <Divider />
      <Stack
        gap={2}
        width={{ md: "700px", sm: "500px", xs: "100%" }}
        alignItems={"end"}
        mt={"44px"}
      >
        <FormProvider {...methods}>
          <Stack gap={2} width={"100%"} alignItems={"end"}>
            <CustomTextField
              name="Current password"
              label="Current password"
              type={"password"}
              width="550px"
              placeholder="current password"
            />
            <CustomTextField
              name="New password"
              label="New password"
              type={"password"}
              width="550px"
              placeholder="new password"
            />
            <CustomTextField
              name="Confirm password"
              label="Confirm passwrod"
              type={"password"}
              width="550px"
              placeholder="confirm password"
            />
          </Stack>
          <Stack spacing={2} mt={2} width="100%" alignItems={"end"}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <CustomButton
                title="Update"
                variant="contained"
                background={COLORS.secondary.main}
                color={COLORS.white.main}
              />
            </Box>
            <Typography color={COLORS.secondary.main}>
              Send me a <b>One-time Password</b>
            </Typography>
          </Stack>
        </FormProvider>
      </Stack>
    </>
  );
};

export default ChangePassword;
