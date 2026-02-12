import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, Stack, Typography } from "@mui/material";
import { auth, db } from "@muc/libs";
import { COLORS, ROUTES } from "@muc/constants";
import { doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { FormData } from "@muc/types";
import SignUpPersonalInfo from "../SignUpPersonalInfo/SignUpPersonalInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpPersonalInfoSchema } from "@muc/validations";

const SignupForm = () => {
  const methods = useForm<FormData>({
    resolver: yupResolver(signUpPersonalInfoSchema),
    defaultValues: {} as FormData,
  });

  const { handleSubmit } = methods;
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const uid = userCredential.user.uid;

      const convertDates = (obj: any): any => {
        if (obj === null || obj === undefined) return obj;

        //  If it's already a Date object
        if (obj instanceof Date) {
          return Timestamp.fromDate(obj);
        }

        //  If it's a string that can be parsed as a date
        if (typeof obj === "string") {
          const parsed = new Date(obj);
          if (!isNaN(parsed.getTime())) {
            return Timestamp.fromDate(parsed);
          }
        }

        if (Array.isArray(obj)) return obj.map(convertDates);

        if (typeof obj === "object") {
          const result: any = {};
          for (const [key, value] of Object.entries(obj)) {
            result[key] = convertDates(value);
          }
          return result;
        }

        return obj;
      };

      const cleanedData = convertDates(data);

      await setDoc(doc(db, "users", uid), {
        ...cleanedData,
        uid,
        isActive: true,

        isSuspended: false,
        dateOfBirth: cleanedData.dateOfBirth,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });

      alert(" User signed up successfully!");
      navigate(ROUTES.HOME);
    } catch (error) {
      throw error;
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          backgroundColor: COLORS.white.darkwhite,
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          maxWidth: "800px",
          width: "100%",
          mx: "auto",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto", //
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: COLORS.secondary.main,
            borderRadius: "10px",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: 600, textAlign: "center", flexShrink: 0 }}
        >
          Create Your Account
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <SignUpPersonalInfo />
        </Box>

        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt: 4, flexShrink: 0 }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={methods.formState.isSubmitting}
            sx={{ width: "50%" }}
          >
            Sign Up
          </Button>
        </Stack>

        <Stack alignItems="center" mt={3} sx={{ flexShrink: 0 }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: "pointer", fontWeight: 600 }}
              onClick={() => navigate(ROUTES.Login)}
            >
              Login
            </Typography>
          </Typography>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default SignupForm;
