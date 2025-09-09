import { CustomPersonalDetailCard, CustomReadMoreCard } from "@muc/components";
import { COLORS } from "@muc/constants";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import { AppLayout } from "@muc/layout";
import UserProfileDetail from "../../components/UserProfileDetail/UserProfileDetail";

import ExtraImgDialog from "../../components/ExtraImgDialog/ExtraImgDialog";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@muc/libs";
import { useEffect, useState } from "react";
import { User } from "@muc/collections";

const UserInfoContainer = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<User | null>(null);

  const getUserData = async () => {
    if (id) {
      const userDoc = await getDoc(doc(db, "users", id));
      if (userDoc.exists()) {
        setUserData(userDoc.data() as User);
      } else {
        setUserData(null);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, [id]);

  const { uid, isSuspended, bio, createdAt, dateOfBirth, email, firstName, lastName, gender, isActive, maritalStatus, lastLogin, likes, socialLinks, visits,
    workExperience, phoneNumber, skills, updatedAt, religion, educationInformation, ...allData } = userData || {};
  console.log(allData, 'this is user data');
  // console.log(languages.urdu, 'this is languages');
  return (
    <AppLayout>
      <Box sx={{ bgcolor: COLORS.gray.lightDarkGray }}>
        <Container
          maxWidth="lg"
          sx={{ bgcolor: COLORS.white.darkwhite, padding: 2 }}
        >
          <Grid container spacing={2} gap={2}>
            <Grid item md={3} xs={12}>
              <Stack
                direction={{ md: "column", xs: "column", sm: "row" }}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: { md: "0", xs: "20px" },
                }}
              >
                <UserInfoCard />
                <UserProfileDetail />
              </Stack>
            </Grid>

            <Grid item md={8.5} xs={12}>
              <ExtraImgDialog />

              <Stack gap={2} mb={2}>
                <CustomReadMoreCard
                  title="A Little Bit About Me"
                  description={bio || "No bio available."}
                />
              </Stack>

              <Stack direction="row" flexWrap="wrap" gap="15px">
                {/* Personal Details */}
                <Box width={{ md: "49%", sm: "47%", xs: "100%" }} key={`${id}-personal`}>
                  <CustomPersonalDetailCard title="Personal Details">
                    <TitleRow
                      label="Full Name"
                      value={`${firstName || ""} ${lastName || ""}`}
                    />
                    <TitleRow label="Email" value={email || "N/A"} />
                    <TitleRow label="Phone Number" value={phoneNumber || "N/A"} />
                    <TitleRow label="Date of Birth" value={dateOfBirth || "N/A"} />
                    <TitleRow label="Marital Status" value={maritalStatus || "N/A"} />
                    <TitleRow label="Gender" value={gender || "N/A"} />
                  </CustomPersonalDetailCard>
                </Box>

                {/* Work Experience */}
                {workExperience && (
                  <Box
                    width={{ md: "49%", sm: "47%", xs: "100%" }}
                    key={`${id}-work`}
                  >
                    <CustomPersonalDetailCard title="Work Experiences">
                      <TitleRow label="Highest Degree" value={"BS"} />
                      <TitleRow
                        label="Company Name"
                        value={workExperience?.companyName || "N/A"}
                      />
                      <TitleRow
                        label="Company Decription"
                        value={workExperience?.description || "N/A"}
                      />
                      <TitleRow
                        label="Currently Working"
                        value={workExperience?.isCurrent ? "Yes" : "No"}
                      />
                      <TitleRow
                        label="Job Role"
                        value={workExperience?.role || "N/A"}

                      />
                      <TitleRow
                        label="Start Date"
                        value={workExperience?.startDate || "N/A"}
                      />
                      <TitleRow
                        label="End Date"
                        value={workExperience?.endDate || "N/A"}
                      />
                    </CustomPersonalDetailCard>

                  </Box>
                )}
                {skills && (
                  <Box
                    width={{ md: "49%", sm: "47%", xs: "100%" }}
                    key={`${id}-skills`}
                  >
                    <CustomPersonalDetailCard title="Skills Details">
                      <TitleRow
                        label="Technical Skills"
                        value={skills.technicalSkills?.join(", ") || "N/A"}
                      />
                      <TitleRow
                        label="Soft Skills"
                        value={skills.softSkills?.join(", ") || "N/A"}
                      />
                      <TitleRow
                        label="Languages"
                        value={skills.languages?.join(", ") || "N/A"}
                      />
                    </CustomPersonalDetailCard>
                  </Box>
                )}
                {educationInformation && (
                  <Box
                    width={{ md: "49%", sm: "47%", xs: "100%" }}
                    key={`${id}-education`}
                  >
                    <CustomPersonalDetailCard title="Education Details">
                      <TitleRow
                        label="Field Of Study"
                        value={educationInformation.fieldOfStudy || "N/A"}
                      />
                      <TitleRow
                        label="Highest Degree"
                        value={educationInformation.highestDegree || "N/A"}
                      />
                      <TitleRow
                        label="Graduation Year"
                        value={educationInformation.graduationYear || "N/A"}
                      />
                      <TitleRow
                        label="Languages"
                        value={educationInformation.institutionName || "N/A"}
                      />
                    </CustomPersonalDetailCard>
                  </Box>
                )}

              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppLayout>
  );
};

export default UserInfoContainer;

/* ✅ TitleRow handles Firestore Timestamp, JS Date, String, Number safely */
const TitleRow = ({ value, label }: { value: any; label: string }) => {
  const formatValue = (val: any) => {
    if (!val) return "N/A";

    // Firestore Timestamp { seconds, nanoseconds }
    if (val?.seconds) {
      return new Date(val.seconds * 1000).toLocaleDateString();
    }

    // JS Date
    if (val instanceof Date) {
      return val.toLocaleDateString();
    }

    // Objects fallback
    if (typeof val === "object") {
      return JSON.stringify(val);
    }

    return String(val);
  };

  return (
    <Stack direction="row" gap="30px" pb="10px">
      <Typography
        color={COLORS.primary.main}
        sx={{ width: "50%", textTransform: "capitalize" }}
      >
        {label}
      </Typography>
      <Typography color={COLORS.dark.main}>{formatValue(value)}</Typography>
    </Stack>
  );
};
