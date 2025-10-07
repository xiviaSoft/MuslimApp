import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  Typography,
  Divider,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { User } from "@muc/collections";
import { useAuth } from "@muc/context";
import {
  CustomSelect,
  CustomTextField,
  MultipulCustomSelect,
} from "@muc/components";
import {
  GenderTypes,
  Languages,
  MaritalStatus,
  Religions,
  SoftSkills,
  TechnicalSkills,
} from "@muc/constants";
import { useUpdateUser } from "@muc/hooks";
import { useState } from "react";
import { formatDateForInput } from "@muc/utils";
import { Timestamp } from "firebase/firestore";



const Section = ({ title }: { title: string }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
      {title}
    </Typography>
    <Divider />
  </Box>
);

const EditProfile = () => {
  const { user } = useAuth();
  const { mutate, isPending } = useUpdateUser(user?.uid || "");

  // ✅ Prepare default values with date formatting
  const methods = useForm<User>({
    defaultValues: user
      ? {
        ...user,
        dateOfBirth: formatDateForInput(user.dateOfBirth), // ✅ string not Date
        workExperience: {
          ...user.workExperience,
          startDate: formatDateForInput(user.workExperience?.startDate),
          endDate: formatDateForInput(user.workExperience?.endDate),
        },
      }
      : undefined,
  });




  const { handleSubmit } = methods;

  const [disableWork, setDisableWork] = useState(false);
  const [disableSocial, setDisableSocial] = useState(false);

  const onSubmit = (data: User) => {
    if (!user?.uid) return;

    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    // ✅ Convert dateOfBirth (string → Firestore Timestamp)
    if (typeof cleanedData.dateOfBirth === "string") {
      cleanedData.dateOfBirth = Timestamp.fromDate(new Date(cleanedData.dateOfBirth));
    }

    // ✅ Convert workExperience dates too (if exist)
    if (cleanedData.workExperience?.startDate && typeof cleanedData.workExperience.startDate === "string") {
      cleanedData.workExperience.startDate = Timestamp.fromDate(
        new Date(cleanedData.workExperience.startDate)
      );
    }

    if (cleanedData.workExperience?.endDate && typeof cleanedData.workExperience.endDate === "string") {
      cleanedData.workExperience.endDate = Timestamp.fromDate(
        new Date(cleanedData.workExperience.endDate)
      );
    }

    console.log("🧩 Final data sent to Firestore:", cleanedData);

    mutate(cleanedData, {
      onSuccess: () => console.log("✅ Firestore update success"),
      onError: (error) => console.error("❌ Firestore update error:", error),
    });
  };

  if (!user) return <p>Loading...</p>;
  console.log("🕓 DOB value:", user?.dateOfBirth, formatDateForInput(user?.dateOfBirth));
  return (
    <FormProvider {...methods}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fafafa",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          Edit Profile
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Personal Details */}
          <Section title="Personal Details" />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="firstName"
                label="First Name"
                type="text"
                placeholder="Enter first name"
                rules={{ required: "First name is required" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="lastName"
                label="Last Name"
                type="text"
                placeholder="Enter last name"
                rules={{ required: "Last name is required" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField name="email" label="Email" type="email" disabled />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="phoneNumber"
                label="Phone Number"
                type="text"
                placeholder="Enter phone number"
                allowOnly="numeric"
                maxLength={11}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelect
                name="religion"
                label="Religion"
                options={Religions.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelect
                name="gender"
                label="Gender"
                options={GenderTypes.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                defaultValue={formatDateForInput(user?.dateOfBirth)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelect
                name="maritalStatus"
                label="Marital Status"
                options={MaritalStatus.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="address"
                label="Address"
                type="text"
                placeholder="Enter address"
                multiline
                minRows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="bio"
                label="Bio"
                type="text"
                placeholder="Enter bio"
                multiline
                minRows={2}
              />
            </Grid>
          </Grid>

          {/* Education */}
          <Section title="Education" />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="educationInformation.institutionName"
                label="Institution Name"
                type="text"
                placeholder="Enter your institution"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="educationInformation.highestDegree"
                label="Highest Degree"
                type="text"
                placeholder="Enter your degree"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="educationInformation.fieldOfStudy"
                label="Field of Study"
                type="text"
                placeholder="Enter field of study"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="educationInformation.graduationYear"
                label="Graduation Year"
                type="text"
                placeholder="Enter graduation year"
              />
            </Grid>
          </Grid>

          {/* Skills */}
          <Section title="Skills" />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <MultipulCustomSelect
                name="skills.languages"
                label="Languages"
                options={Languages.map((item) => ({ label: item, value: item }))}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MultipulCustomSelect
                name="skills.softSkills"
                label="Soft Skills"
                options={SoftSkills.map((item) => ({ label: item, value: item }))}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MultipulCustomSelect
                name="skills.technicalSkills"
                label="Technical Skills"
                options={TechnicalSkills.map((item) => ({ label: item, value: item }))}
              />
            </Grid>
          </Grid>

          {/* Work Experience */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ flexGrow: 1 }}>Work Experience</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={disableWork}
                    onChange={(e) => setDisableWork(e.target.checked)}
                  />
                }
                label="Disable"
                onClick={(e) => e.stopPropagation()}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="workExperience.companyName"
                    label="Company Name"
                    type="text"
                    placeholder="Enter company name"
                    disabled={disableWork}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="workExperience.role"
                    label="Role"
                    type="text"
                    placeholder="Enter role"
                    disabled={disableWork}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="workExperience.address"
                    label="Company Address"
                    type="text"
                    placeholder="Enter address"
                    disabled={disableWork}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="workExperience.startDate"
                    label="Start Date"
                    type="date"
                    disabled={disableWork}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="workExperience.endDate"
                    label="End Date"
                    type="date"
                    disabled={disableWork}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    name="workExperience.description"
                    label="Description"
                    type="text"
                    placeholder="Enter description"
                    multiline
                    minRows={2}
                    disabled={disableWork}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Social Links */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ flexGrow: 1 }}>Social Links</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={disableSocial}
                    onChange={(e) => setDisableSocial(e.target.checked)}
                  />
                }
                label="Disable"
                onClick={(e) => e.stopPropagation()}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="socialLinks.facebook"
                    label="Facebook"
                    type="text"
                    placeholder="Facebook URL"
                    disabled={disableSocial}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="socialLinks.instagram"
                    label="Instagram"
                    type="text"
                    placeholder="Instagram URL"
                    disabled={disableSocial}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="socialLinks.linkedin"
                    label="LinkedIn"
                    type="text"
                    placeholder="LinkedIn URL"
                    disabled={disableSocial}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="socialLinks.twitter"
                    label="Twitter"
                    type="text"
                    placeholder="Twitter URL"
                    disabled={disableSocial}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? "Updating..." : "Update Profile"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </FormProvider>
  );
};

export default EditProfile;
