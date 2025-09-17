import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, Typography, Divider, Grid, Paper } from "@mui/material";
import { User } from "@muc/collections";
import { useAuth } from "@muc/context";
import { CustomSelect, CustomTextField, MultipulCustomSelect } from "@muc/components";
import { GenderTypes, Languages, MaritalStatus, Religions, SoftSkills, TechnicalSkills } from "@muc/constants";
import { useUpdateUser } from "@muc/hooks";

const Section = ({ title }: { title: string }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
  </Box>
);

const EditProfile = () => {
  const { user } = useAuth();
  console.log(user, "this is user in the edit profile");
  const updateUser = useUpdateUser(user?.uid || "");
  const methods = useForm<User>({
    defaultValues: user ?? {},
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: User) => {
    if (!user?.uid) return;
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );
    updateUser.mutate(cleanedData);
  };

  if (!user) return <p>Loading...</p>;

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
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
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
              <CustomTextField
                name="email"
                label="Email"
                type="email"
                disabled
              />
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
            {/* languages */}
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
            {/* soft skill */}
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
            {/* tech skill */}
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

          {/* Work Experience */}
          <Section title="Work Experience" />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="workExperience.companyName"
                label="Company Name"
                type="text"
                placeholder="Enter company name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="workExperience.role"
                label="Role"
                type="text"
                placeholder="Enter role"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="workExperience.address"
                label="Company Address"
                type="text"
                placeholder="Enter address"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="workExperience.isCurrent"
                label="Currently Working"
                type="text"
                placeholder="Enter address"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="workExperience.startDate"
                label="Start Date"
                type="date"
                placeholder="Enter start date"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="workExperience.endDate"
                label="End Date"
                type="date"
                placeholder="Enter end date"
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
              />
            </Grid>
          </Grid>

          {/* Social Links */}
          <Section title="Social Links" />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="socialLinks.facebook"
                label="Facebook"
                type="text"
                placeholder="Facebook URL"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="socialLinks.instagram"
                label="Instagram"
                type="text"
                placeholder="Instagram URL"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="socialLinks.linkedin"
                label="LinkedIn"
                type="text"
                placeholder="LinkedIn URL"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="socialLinks.twitter"
                label="Twitter"
                type="text"
                placeholder="Twitter URL"
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button type="submit" variant="contained">
              Update Profile
            </Button>
          </Box>
        </Box>
      </Paper>
    </FormProvider>
  );
};

export default EditProfile;
