import { CustomButton, CustomTextField } from "@muc/components";
import { COLORS, ROUTES } from "@muc/constants";
import { useAuth } from "@muc/context";
import { auth } from "@muc/libs";
import {

    Stack,
    Typography,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router";

const SignupForm = () => {
    const methods = useForm();

    const { user, setUser } = useAuth()
    const onSubmit = async (data: any) => {
        await createUserWithEmailAndPassword(auth, data.email, data.password)

        console.log("Sign Up Data:", data);
        console.log("user login:", data);
        setUser(data)
        // Call API or handle SignupForm logic here
    };
    console.log(user, 'this is user in the sign up page')

    return (
        <Stack
            component="section"
            sx={{
                bgcolor: "#1a7ea638",
                width: 620,
                gap: 6,
                alignItems: "center",
                py: 5,
                px: 4,
                boxShadow:
                    "0 5px 8px rgba(0,0,0,0.2), 0 9px 26px rgba(0,0,0,0.19)",
                borderRadius: 3,
                minHeight: 700,
                mx: "auto",
                maxHeight: "100vh",       // restrict height
                overflowY: "auto",        // enable scroll if needed
                scrollbarWidth: "thin",   // Firefox scrollbar
                "&::-webkit-scrollbar": { width: "6px" }, // Chrome/Edge
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: COLORS.secondary.main,
                    borderRadius: "10px",
                },
            }}
        >
            {/* Title */}
            <Typography
                variant="h4"
                color={COLORS.white.main}
                fontWeight="bold"
                textAlign="center"
            >
                Create Your Dating Profile
            </Typography>

            <FormProvider {...methods}>
                <Stack
                    component="form"
                    direction="column"
                    gap={3}
                    onSubmit={methods.handleSubmit(onSubmit)}
                    noValidate
                    sx={{ width: "100%", maxWidth: 450 }}
                >
                    {/* Basic Info */}
                    <CustomTextField
                        name="firstName"
                        placeholder="First Name"
                        type="text"
                        height="48px"
                    />
                    <CustomTextField
                        name="lastName"
                        placeholder="Last Name"
                        type="text"
                        height="48px"
                    />
                    <CustomTextField
                        name="email"
                        placeholder="Email Address"
                        type="email"
                        height="48px"
                    />
                    <CustomTextField
                        name="password"
                        placeholder="Password"
                        type="password"
                        height="48px"
                    />


                    {/* Dating-specific Info */}
                    {/* <CustomTextField
                        name="age"
                        placeholder="Age"
                        type="number"
                        height="48px"
                    /> */}
                    {/* <CustomTextField
                        name="gender"
                        placeholder="Gender"
                        type="text"
                        height="48px"
                    /> */}


                    {/* 
                    <FormControlLabel
                        control={<Checkbox sx={{ color: COLORS.white.main }} />}
                        sx={{ color: COLORS.white.main, fontSize: 14 }}
                        label="I agree to the Terms & Privacy Policy"
                    /> */}

                    {/* Button */}
                    <CustomButton
                        type="submit"
                        variant="contained"
                        title="Sign Up"
                        background={COLORS.secondary.main}
                        color="white"
                        width="100%"
                        height="56px"
                    />

                    {/* Redirect */}
                    <Typography
                        color={COLORS.white.main}
                        fontSize={14}
                        textAlign="center"
                        mt={1}
                    >
                        Already have an account?{" "}
                        <Link
                            to={ROUTES.Login}
                            style={{
                                color: COLORS.secondary.main,
                                fontWeight: "bold",
                                textDecoration: "none",
                            }}
                        >
                            Login here
                        </Link>
                    </Typography>
                </Stack>
            </FormProvider>
        </Stack>
    );
};

export default SignupForm;
