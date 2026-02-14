// LoginDialogBox.tsx
import * as React from "react";
import {
  Dialog,
  Stack,
  Typography,
  Divider,
  Link,
  Box,
  FormControlLabel,
  Checkbox,
  IconButton,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, FormProvider } from "react-hook-form";
import { COLORS } from "@muc/constants";
import { CustomButton, CustomTextField } from "@muc/components";

interface LoginDialogBoxProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

const LoginDialogBox: React.FC<LoginDialogBoxProps> = ({
  open,
  onClose,
  onLoginSuccess,
}) => {
  const methods = useForm<{ email: string; password: string }>({
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const submitData = async (data: { email: string; password: string }) => {
    try {
      // TODO: real auth
      console.log("login payload", data);
      onLoginSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="login-dialog-title"
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 3,
          px: 3,
          pt: 2,
          pb: 1,
          position: "relative",
          maxHeight: "90vh",
        },
      }}
    >
      {/* close icon */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "grey.600",
        }}
        size="small"
      >
        <CloseIcon />
      </IconButton>

      <Box
        component="form"
        onSubmit={handleSubmit(submitData)}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <DialogContent
          sx={{
            px: 0,
            pt: 1,
            pb: 0,
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "rgba(0,0,0,0.1)",
              borderRadius: 3,
            },
          }}
        >
          <Stack spacing={3}>
            <Box textAlign="center" mt={1}>
              <Typography variant="h5" fontWeight={700}>
                Welcome Back
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: COLORS.gray.darkGray, mt: 0.5 }}
              >
                Log in to your Travelwise account
              </Typography>
            </Box>

            <FormProvider {...methods}>
              <Stack spacing={2}>
                <CustomTextField
                  name="email"
                  label="Email"
                  placeholder="you@example.com"
                  type="email"
                  // you can pass validation props inside your CustomTextField if it supports them
                />
                <CustomTextField
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                  spacing={1}
                >
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                      <Typography variant="caption">Remember me</Typography>
                    }
                    sx={{ m: 0 }}
                  />
                  <Link
                    component="button"
                    underline="none"
                    variant="caption"
                    sx={{
                      color: COLORS.red.main,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      /* TODO: forgot password flow */
                    }}
                  >
                    Forgot password?
                  </Link>
                </Stack>
                <CustomButton
                  type="submit"
                  variant="contained"
                  width="100%"
                  isLoading={isSubmitting}
                  title={isSubmitting ? "Logging in…" : "Log in"}
                  height="48px"
                />
              </Stack>
            </FormProvider>

            <Box textAlign="center" pt={1}>
              <Typography variant="body2">
                Don’t have an account?{" "}
                <Link
                  component="button"
                  underline="hover"
                  sx={{ color: COLORS.red.main, fontWeight: 600 }}
                  onClick={() => {
                    // TODO: navigate to signup
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ width: "100%" }}
            >
              <Divider flexItem />
              <Typography
                variant="caption"
                sx={{ whiteSpace: "nowrap", color: COLORS.gray.main }}
              >
                Or login with
              </Typography>
              <Divider flexItem />
            </Stack>
          </Stack>
        </DialogContent>

        {/* bottom help / extra action */}
        {/* <Box
          sx={{
            mt: 1,
            px: 1,
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button
            onClick={() => {
              methods.handleSubmit(submitData)();
            }}
            variant="text"
            sx={{ textTransform: "none" }}
          >
            Help
          </Button>
        </Box> */}
      </Box>
    </Dialog>
  );
};

export default LoginDialogBox;
