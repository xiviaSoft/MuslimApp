import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import {
  CustomButton,
  CustomSelect,
  CustomTextField,
  MultipulCustomSelect,
} from "@muc/components";
import {
  COLORS,
  GenderTypes,
  Languages,
  MARITAL_STATUS,
  Religions,
  SoftSkills,
  TechnicalSkills,
} from "@muc/constants";

import { User } from "@muc/collections";
import { useUpdateUser } from "@muc/hooks";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "@muc/context";

const Section = ({ title }: { title: string }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
      {title}
    </Typography>
    <Divider />
  </Box>
);

const EditProfile = () => {

  const [disableWork, setDisableWork] = useState(false);
  const [disableSocial, setDisableSocial] = useState(false);
  const { user } = useAuth();

  const updateUser = useUpdateUser(user?.uid || "");

  const methods = useForm<User>({
    defaultValues: user ?? {},
  });
  const { handleSubmit, reset, } = methods;

  const toDateInputValue = (value: any): string | "" => {
    if (!value) return "";
    const date = value instanceof Timestamp ? value.toDate() : new Date(value);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (user) {
      const formattedUser: Partial<User> & Record<string, any> = {
        ...user,
        dateOfBirth: toDateInputValue(user.dateOfBirth),
        workExperience: user.workExperience
          ? {
            ...user.workExperience,
            startDate: toDateInputValue(user.workExperience.startDate),
            endDate: toDateInputValue(user.workExperience.endDate),
          }
          : undefined,
      };
      reset(formattedUser);
    }
  }, [user, reset]);

  const onSubmit = (data: User) => {
    if (!user?.uid) return;

    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    updateUser.mutate(cleanedData as Partial<User>);
  };

  return (
    <FormProvider {...methods}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: 4,
          borderRadius: 3,
          backgroundColor: COLORS.white?.main || "#fafafa",
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
              <CustomTextField
                name="email"
                label="Email"
                type="email"
                placeholder=""
                disabled
              // rules={{ required: "Last name is required" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="phoneNumber"
                label="Phone Number"
                type="text"
                placeholder="Update you Phone Number"

              // rules={{ required: "Last name is required" }}
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelect
                name="maritalStatus"
                label="Marital Status"
                options={MARITAL_STATUS.map((item) => ({
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

          {/* ---------- EDUCATION ---------- */}
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

          {/* ---------- SKILLS ---------- */}
          <Section title="Skills" />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <MultipulCustomSelect
                name="skills.languages"
                label="Languages"
                options={Languages.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MultipulCustomSelect
                name="skills.softSkills"
                label="Soft Skills"
                options={SoftSkills.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MultipulCustomSelect
                name="skills.technicalSkills"
                label="Technical Skills"
                options={TechnicalSkills.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Grid>
          </Grid>

          {/* ---------- WORK EXPERIENCE ---------- */}
          <Accordion defaultExpanded sx={{ backgroundColor: COLORS.white?.grayWhite }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Section title="Work Experience" />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={disableWork}
                    onChange={(e) => setDisableWork(e.target.checked)}
                  />
                }
                label="Disable"
                onClick={(e) => e.stopPropagation()}
                sx={{ ml: "auto" }}
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

          {/* ---------- SOCIAL LINKS ---------- */}
          <Accordion defaultExpanded sx={{ backgroundColor: COLORS.white?.grayWhite }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Section title="Social Links" />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={disableSocial}
                    onChange={(e) => setDisableSocial(e.target.checked)}
                  />
                }
                label="Disable"
                onClick={(e) => e.stopPropagation()}
                sx={{ ml: "auto" }}
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

          {/* ---------- ACTION BUTTONS ---------- */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Stack direction="row" gap={2}>
              <CustomButton title="Update Profile" type="submit" isLoading={updateUser.isPending} />
            </Stack>
          </Box>
        </Box>
      </Paper>
    </FormProvider>
  );
};

export default EditProfile;
