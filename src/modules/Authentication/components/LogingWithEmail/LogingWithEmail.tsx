import { CustomButton, CustomTextField } from "@muc/components";
import { COLORS, ROUTES } from "@muc/constants";
import { useAuth } from "@muc/context";
import {
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginWithEmail = () => {
  const { login } = useAuth();
  const methods = useForm<LoginFormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await login(data);
      navigate(ROUTES.HOME);
      console.log("Form Data:", data);
    } catch (error: any) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <Stack
      component="section"
      sx={{
        bgcolor: "#1a7ea638",
        width: { xs: "100%", sm: "450px", md: "500px", lg: "585px" },
        gap: 6,
        alignItems: "center",
        py: 4.5,
        boxShadow: "0 5px 8px rgba(0,0,0,0.2), 0 9px 26px rgba(0,0,0,0.19)",
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

          <CustomButton
            type="submit"
            variant="contained"
            title="Login"
            background={COLORS.secondary.main}
            color="white"
            width="100%"
            height="56px"
          />

          {/* Forgot Password */}
          <Typography
            component={Link}
            to={ROUTES.Login} // you can change this to ROUTES.FORGOT_PASSWORD if you have one
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

          {/* 🔥 Create New Account */}
          <Typography
            component={Link}
            to={ROUTES.SIGNUP} // <-- make sure you have this in your routes
            sx={{
              color: COLORS.secondary.main,
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              textDecoration: "none",
              mt: 2,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Create New Account
          </Typography>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export default LoginWithEmail;
