import { CustomButton, CustomTextField } from "@muc/components";
import { COLORS } from "@muc/constants";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const DeleteProfile = () => {
  const [reasons, setReasons] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.name;
    setReasons((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const methods = useForm();
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          fontSize: "22px",
          color: COLORS.gray.darkGray,
          mb: "21px",
          textAlign: "left",
        }}
      >
        Delete Profile
      </Typography>
      <Divider />
      <FormProvider {...methods}>
        <Stack
          gap={3}
          alignItems={"center"}
          width={{ md: "700px", xs: "100%" }}
        >
          <Stack
            direction={{ sm: "row", xs: "column" }}
            mt={"44px"}
            spacing={2}
            alignItems="start"
            justifyContent={"center"}
          >
            <Typography
              sx={{ minWidth: 150, fontWeight: { xs: "bold", sm: "500" } }}
            >
              Reason for leaving
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={reasons.includes("success")}
                    onChange={handleChange}
                    name="success"
                  />
                }
                label="I found success"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={reasons.includes("trying")}
                    onChange={handleChange}
                    name="trying"
                  />
                }
                label="I was just trying out the service"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={reasons.includes("re-register")}
                    onChange={handleChange}
                    name="re-register"
                  />
                }
                label="I am going to re-register as another user"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={reasons.includes("privacy")}
                    onChange={handleChange}
                    name="privacy"
                  />
                }
                label="I am concerned about my privacy"
              />
            </FormGroup>
          </Stack>
          <CustomTextField
            name="Comments"
            label="Comments"
            type="text"
            multiline={2}
            width="100%"
            placeholder="comments
            "
          />
          <CustomTextField
            type="password"
            name="passowrd"
            label="password"
            width={"100%"}
            placeholder="password"
          />
          <Box display={"flex"} alignSelf={"end"} pr={"15px"}>
            <CustomButton
              title="Delete"
              variant="contained"
              background={COLORS.red.main}
              color={COLORS.white.main}
              width="155px"
            />
          </Box>
        </Stack>
      </FormProvider>
    </>
  );
};

export default DeleteProfile;
