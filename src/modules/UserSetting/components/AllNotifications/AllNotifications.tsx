import { CustomSelect, } from "@muc/components";
import { COLORS, newMessages } from "@muc/constants";
import { Divider, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

const AllNotifications = () => {
  const methods = useForm();
  return (
    <>
      <Stack padding={{ md: '45px', sm: '20px', xs: '10px' }}>
        <Stack gap={"10px"} color={COLORS.gray.darkGray}>
          <Typography variant="h3" sx={{ fontWeight: 500, fontSize: "24px" }}>
            Notifications
          </Typography>
          <Typography>
            Change your Single Muslim notifications such as which emails and
            alerts ( Mobile App ) you receive and how often you receive these.
          </Typography>
          <Stack sx={styleNotification}>
            <Typography>Someone views your profile (Alerts Only)</Typography>
            {/* <CustomSwithButton /> */}
          </Stack>

          <Divider />
          <Stack sx={styleNotification}>
            <Typography>A favourite user is online (Alert Only)</Typography>
            {/* <CustomSwithButton /> */}
          </Stack>
          <Divider />
          <Stack sx={styleNotification}>
            <Typography>Profile is approved</Typography>
            {/* <CustomSwithButton /> */}
          </Stack>
          <Divider />
          <Stack sx={styleNotification}>
            <Typography>Picture(s) are approved</Typography>
            {/* <CustomSwithButton /> */}
          </Stack>
          <Divider />
          <Stack sx={styleNotification}>
            <Typography>Private gallery requests</Typography>
            {/* <CustomSwithButton /> */}
          </Stack>
          <Divider />
          <Stack sx={styleNotification}>
            <Typography>Private gallery requests approved/declined</Typography>
            {/* <CustomSwithButton /> */}
          </Stack>

          <Divider />
          <FormProvider {...methods}>
            <Stack sx={styleNotification}>
              <Typography>New messages</Typography>
              <CustomSelect
                name="New messages"
                options={newMessages.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Stack>
            <Divider />
            <Stack sx={styleNotification}>
              <Typography>New Search Matches </Typography>
              <CustomSelect
                name="New messages"
                options={newMessages.slice(1).map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Stack>
            <Divider />
          </FormProvider>
          <Stack sx={styleNotification}>
            <Typography>Someone Likes You (Alert Only)</Typography>
            {/* <CustomSwithButton /> */}
          </Stack>

          <Divider />
          <Stack sx={styleNotification}>
            <Typography>Someone Matched With You</Typography>
            {/* <CustomSwithButton /> */}
          </Stack>

          <Divider />
          <Stack sx={styleNotification}>
            <Typography>See your recommendations</Typography>
            {/* <CustomSwithButton /> */}
          </Stack>

          <Divider />
          <Stack sx={styleNotification}>
            <Typography>Email Opt-in</Typography>
            {/* <CustomSwithButton /> */}
          </Stack>

          <Divider />
        </Stack>
      </Stack>
    </>
  );
};

export default AllNotifications;

const styleNotification = {
  justifyContent: "space-between",
  display: "flex",
  flexDirection: "row",
  mt: 2,
  direction: "row",
};
