import { useState } from "react";
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Box,
    Typography,
    Stack,
} from "@mui/material";
import { auth, db } from "@muc/libs";
import { COLORS, ROUTES } from "@muc/constants";
import { useForm, FormProvider } from "react-hook-form";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import GetStepContent from "../GetStepContent/GetStepContent";
import { FormData } from "@muc/types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";


const steps = ["Personal Info", "Education & Languages", "Work Experience", "Social Links"];

const SignupForm = () => {
    const methods = useForm<FormData>({ defaultValues: {} as FormData });
    const { handleSubmit, trigger } = methods;
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);

    // 🔹 Submit Handler
    const onSubmit = async (data: FormData) => {
        try {

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            const uid = userCredential.user.uid;


            const {
                password,
                companyName,
                companyaddress,
                companydescription,
                role,
                startDate,
                endDate,
                isCurrent,
                technicalSkills,
                softSkills,
                languages,
                facebook,
                twitter,
                linkedin,
                instagram,
                bio,
                highestDegree, institutionName, graduationYear, fieldOfStudy,
                ...rest
            } = data;

            // 2️⃣ Save to Firestore
            await setDoc(doc(db, "users", uid), {
                ...rest,
                uid,

                isActive: true,
                isSuspended: false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
                              bio: bio || "",
                educationInformation: {
                    highestDegree: highestDegree || "",
                    institutionName: institutionName || "",
                    graduationYear: graduationYear || null,
                    fieldOfStudy: fieldOfStudy || "",
                },

                workExperience: {
                    companyName: companyName || "",
                    role: role || "",
                    startDate: startDate ? new Date(startDate) : null,
                    address: companyaddress || "",
                    endDate: isCurrent ? null : endDate ? new Date(endDate) : null,
                    isCurrent: isCurrent || false,
                    description: companydescription || "",
                },

                socialLinks: {
                    facebook: facebook || "",
                    twitter: twitter || "",
                    linkedin: linkedin || "",
                    instagram: instagram || "",
                },


                skills: {
                    technicalSkills: technicalSkills
                        ? (Array.isArray(technicalSkills)
                            ? technicalSkills
                            : technicalSkills.split(",").map((item: string) => item.trim()))
                        : [],

                    softSkills: softSkills
                        ? (Array.isArray(softSkills)
                            ? softSkills
                            : softSkills.split(",").map((item: string) => item.trim()))
                        : [],

                    languages: languages
                        ? (Array.isArray(languages)
                            ? languages
                            : languages.split(",").map((item: string) => item.trim()))
                        : [],
                },
            });

            alert("User signed up successfully!");
            navigate(ROUTES.HOME);
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const stepFields: (keyof FormData)[][] = [
        ["firstName", "lastName", "email", "dateOfBirth", "gender", "maritalStatus", "religion"], // 
        ["highestDegree"],
        ["companyName", "role", "startDate"],
        ["facebook", "twitter", "linkedin", "instagram"],
    ];

    const handleNext = async () => {
        const fieldsToValidate = stepFields[activeStep];
        if (!fieldsToValidate) {
            setActiveStep((prev) => prev + 1);
            return;
        }

        const isValid = await trigger(fieldsToValidate);
        if (isValid) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    return (
        <FormProvider {...methods}>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    backgroundColor: COLORS.white.darkwhite,
                    p: { xs: 2, sm: 3, md: 4 },
                    height: { xs: "auto", md: "90vh" },
                    borderRadius: 2,
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    maxWidth: "800px",
                    mx: "auto",
                    overflowY: { xs: "visible", md: "auto" },
                    "&::-webkit-scrollbar": { width: "8px" },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: COLORS.secondary.main,
                        borderRadius: "10px",
                    },
                    scrollbarWidth: "thin",
                }}
            >
                {/* Stepper */}
                <Stepper
                    activeStep={activeStep}
                    sx={{
                        mb: { xs: 2, md: 3 },
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Step Content */}
                <Box sx={{ p: { xs: 1, md: 2 } }}>
                    <GetStepContent step={activeStep} />
                </Box>

                {/* Navigation Buttons */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mt: 3, flexWrap: "wrap", gap: 2 }}
                >
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="outlined"
                    >
                        Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={handleNext}>
                            Next
                        </Button>
                    )}
                </Stack>


                <Stack alignItems="center" mt={3}>
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
