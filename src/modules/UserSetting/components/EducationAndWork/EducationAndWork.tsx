import { CustomButton } from "@muc/components";
import {
  COLORS,

} from "@muc/constants";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

const EducationAndWork = () => {
  const methods = useForm();
  return (
    <Stack
      component={Paper}
      sx={{
        gap: "20px",
        padding: 2,
        width: "100%",
      }}
    >
      <Typography variant="h6" fontSize={"24px"} color={COLORS.secondary.main}>
        Education and Work
      </Typography>
      <FormProvider {...methods}>
        {/* <CustomSelect
          name="First Language(s)"
          label="First Language(s)"
          labelOutside={true}
          options={Languages.map((item) => ({
            label: item,
            value: item,
          }))}
        /> */}
        {/* <CustomSelect
          name="Second Language(s)"
          label="Second Language(s)"
          labelOutside={true}
          options={Languages.map((item) => ({
            label: item,
            value: item,
          }))}
        /> */}

        {/* <CustomSelect
          name="Education Level"
          label="Education Level"
          labelOutside={true}
          options={EducationLevel.map((item) => ({
            label: item,
            value: item,
          }))}
        /> */}
        {/* <CustomSelect
          name="Current Income"
          label="Current Income"
          labelOutside={true}
          options={CurrentIncome.map((item) => ({
            label: item,
            value: item,
          }))}
        /> */}

        {/* <CustomSelect
          name="Profession"
          label="Profession"
          labelOutside={true}
          options={Professions.map((item) => ({
            label: item,
            value: item,
          }))}
        /> */}
        <Box sx={{ alignSelf: "end" }}>
          <CustomButton
            title="Update"
            variant="contained"
            type="submit"
            background={COLORS.secondary.main}
            color={COLORS.white.main}
          />
        </Box>
      </FormProvider>
    </Stack>
  );
};

export default EducationAndWork;
