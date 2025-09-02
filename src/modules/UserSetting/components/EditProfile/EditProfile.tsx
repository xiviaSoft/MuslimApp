import { useForm, FormProvider } from "react-hook-form";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@muc/libs";
import {
  Box,
  Button,
  Typography,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { User } from "@muc/collections";
import { useAuth } from "@muc/context";
import { CustomSelect, CustomTextField } from "@muc/components";
import { GenderTypes } from "@muc/constants";

const Section = ({ title }: { title: string }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
  </Box>
);

const EditProfile = () => {
  const { user, setUser } = useAuth();
  const methods = useForm<User>({
    defaultValues: user ?? {},
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: User) => {
    if (!user?.uid) return;

    try {

      const cleanedData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
      );

      await setDoc(
        doc(db, "users", user.uid),
        {
          ...cleanedData,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setUser({ ...user, ...cleanedData });
      console.log("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
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
                placeholder=""
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
              <CustomTextField
                name="religion"
                label="Religion"
                type="text"
                placeholder="Enter religion"
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
                placeholder=""
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="maritalStatus"
                label="Marital Status"
                type="text"
                placeholder="Enter marital status"
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
          </Grid>

          {/* Education */}
          <Section title="Education" />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="highestDegree"
                label="Highest Degree"
                type="text"
                placeholder="Enter your degree"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="languages"
                label="Languages"
                type="text"
                placeholder="Enter languages"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="skills"
                label="Skills"
                type="text"
                placeholder="Enter skills"
              />
            </Grid>
          </Grid>

          {/* Work Experience */}
          <Section title="Work Experience" />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="companyName"
                label="Company Name"
                type="text"
                placeholder="Enter company name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="role"
                label="Role"
                type="text"
                placeholder="Enter role"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="startDate"
                label="Start Date"
                type="date"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="endDate"
                label="End Date"
                type="date"
                placeholder=""
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="companyaddress"
                label="Company Address"
                type="text"
                placeholder="Enter company address"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="companydescription"
                label="Company Description"
                type="text"
                placeholder="Enter company description"
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
                name="facebook"
                label="Facebook"
                type="text"
                placeholder="Facebook URL"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="instagram"
                label="Instagram"
                type="text"
                placeholder="Instagram URL"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="linkedin"
                label="LinkedIn"
                type="text"
                placeholder="LinkedIn URL"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="twitter"
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
