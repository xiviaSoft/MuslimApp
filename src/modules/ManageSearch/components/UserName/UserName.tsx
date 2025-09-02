import { CustomButton, CustomTextField } from "@muc/components";
import { COLORS } from "@muc/constants";
import { Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

const UserName = () => {
  const methods = useForm();
  return (
    <>
      <FormProvider {...methods}>
        <CustomTextField label="User name" type="text" name="username" placeholder="user name" />
        <Box sx={{ alignSelf: "end" }}>
          <CustomButton
            title="Search Now"
            variant="contained"
            background="#5cb85c"
            color={COLORS.white.main}
          />
        </Box>
      </FormProvider>
    </>
  );
};

export default UserName;
