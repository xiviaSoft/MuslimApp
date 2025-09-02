import { CustomButton, CustomTextField } from "@muc/components";
import { COLORS } from "@muc/constants";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

const ChangeEmail = () => {
  const methods = useForm();
  return (
    <>
      <Typography
        variant="h6"
        fontSize={"24px"}
        color={COLORS.gray.darkGray}
        mb={"21px"}
      >
        Change Email
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
              name="New Email"
              label="New Email"
              type={"email"}
              width="550px"
              placeholder="New email"
            />
            <CustomTextField
              name="Confirm New Email"
              label=" Confirm New Email"
              type={"email"}
              width="550px"
              placeholder="confrim email"
            />
            <CustomTextField
              name="password"
              label="Current passwrod"
              type={"password"}
              width="550px"
              placeholder="Current password"
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

export default ChangeEmail;
