import { CustomButton, CustomTextField } from "@muc/components";
import { COLORS, ROUTES } from "@muc/constants";
import {
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router";

const LoginWithEmail = () => {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    // Handle login logic here (API call, validation, etc.)
  };

  return (
    <Stack
      component="section"
      sx={{
        bgcolor: "#1a7ea638",
        width: 585,
        gap: 6,
        alignItems: "center",
        py: 4.5,
        boxShadow:
          "0 5px 8px rgba(0,0,0,0.2), 0 9px 26px rgba(0,0,0,0.19)",
        minHeight: 604,
        borderRadius: 3,
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        color={COLORS.white.main}
        fontWeight="bold"
        textAlign="center"
      >
        Email or Username
      </Typography>

      {/* Form Section */}
      <FormProvider {...methods}>
        <Stack
          component="form"
          direction="column"
          gap={2.5}
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
          sx={{ width: "100%", maxWidth: 400 }}
        >
          <CustomTextField
            type="email"
            placeholder="Username / Email"
            name="email"
            height="48px"
          />

          <CustomTextField
            type="password"
            placeholder="Password"
            name="password"
            height="48px"
            
          />

          <FormControlLabel
            control={<Checkbox sx={{ color: COLORS.white.main }} />}
            label="Remember Me"
            sx={{
              color: COLORS.white.main,
              fontSize: 14,
            }}
          />

          {/* <Box
            component="img"
            src="/assets/images/captcha.png"
            alt="Captcha verification"
            sx={{ width: 250, alignSelf: "center" }}
          /> */}

          <CustomButton
            type="submit"
            variant="contained"
            title="Login"
            background={COLORS.secondary.main}
            color="white"
            width="100%"
            height="56px"
          />

          <Typography
            component={Link}
            to={ROUTES.Login}
            sx={{
              color: COLORS.white.main,
              textAlign: "center",
              fontSize: 14,
              textDecoration: "none",
              mt: 1,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Forgotten Password?
          </Typography>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export default LoginWithEmail;
