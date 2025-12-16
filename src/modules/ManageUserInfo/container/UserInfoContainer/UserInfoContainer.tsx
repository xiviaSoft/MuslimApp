import { CustomPersonalDetailCard, CustomReadMoreCard } from "@muc/components";
import { COLORS } from "@muc/constants";
import { Box, CircularProgress, Container, Grid, Stack, Typography } from "@mui/material";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import { AppLayout } from "@muc/layout";
import UserProfileDetail from "../../components/UserProfileDetail/UserProfileDetail";
import ExtraImgDialog from "../../components/ExtraImgDialog/ExtraImgDialog";
import { useParams } from "react-router";
import { doc, getDoc, } from "firebase/firestore";
import { db } from "@muc/libs";
import { User } from "@muc/collections";
import { useQuery } from "@tanstack/react-query";
import TitleRow from "../../components/TitleRow/TitleRow";

const UserInfoContainer = () => {
  const { id } = useParams();

  const getUserData = async (id: string) => {
    const userDoc = await getDoc(doc(db, "users", id));
    return userDoc.exists() ? (userDoc.data() as User) : null;
  };

  const { data: userData, isLoading, isError } = useQuery<User | null>({
    queryKey: ["userData", id],
    queryFn: () => getUserData(id as string),
    enabled: !!id
  });




  if (isLoading) return <Box
    sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '10px'
    }}
  >
    <CircularProgress />
    <Typography>
      Loading user...
    </Typography></Box>;
  if (isError) return <Typography color="error">Error loading user</Typography>;





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
                  description={userData?.bio || "No bio available."}
                />
              </Stack>

              <Stack direction="row" flexWrap="wrap" gap="15px">
                {/* Personal Details */}
                <Box width={{ md: "49%", sm: "47%", xs: "100%" }} key={`${id}-personal`}>
                  <CustomPersonalDetailCard title="Personal Details">
                    <TitleRow
                      label="Full Name"
                      value={`${userData?.firstName || ""} ${userData?.lastName || ""}`}
                    />
                    {/* <TitleRow label="Email" value={email || "N/A"} /> */}
                    {/* <TitleRow label="Phone Number" value={phoneNumber || "N/A"} /> */}
                    <TitleRow label="Date of Birth" value={userData?.dateOfBirth || "N/A"} />
                    <TitleRow label="Marital Status" value={userData?.maritalStatus || "N/A"} />
                    <TitleRow label="Gender" value={userData?.gender || "N/A"} />
                    {userData?.showAddress && (
                      <TitleRow
                        label="Address"
                        value={userData?.address || "N/A"}
                      />
                    )}
                  </CustomPersonalDetailCard>
                </Box>

                {/* Work Experience */}
                {userData?.workExperience && (
                  <Box
                    width={{ md: "49%", sm: "47%", xs: "100%" }}
                    key={`${id}-work`}
                  >
                    <CustomPersonalDetailCard title="Work Experiences">

                      <TitleRow
                        label="Company Name"
                        value={userData?.workExperience?.companyName || "N/A"}
                      />
                      <TitleRow
                        label="Company Decription"
                        value={userData?.workExperience?.description || "N/A"}
                      />
                      <TitleRow
                        label="Currently Working"
                        value={userData?.workExperience?.isCurrent ? "Yes" : "No"}
                      />
                      <TitleRow
                        label="Job Role"
                        value={userData?.workExperience?.role || "N/A"}

                      />
                      <TitleRow
                        label="Start Date"
                        value={userData?.workExperience?.startDate || "N/A"}
                      />
                      <TitleRow
                        label="End Date"
                        value={userData?.workExperience?.endDate || "N/A"}
                      />
                    </CustomPersonalDetailCard>

                  </Box>
                )}
                {userData?.skills && (
                  <Box
                    width={{ md: "49%", sm: "47%", xs: "100%" }}
                    key={`${id}-skills`}
                  >
                    <CustomPersonalDetailCard title="Skills Details">
                      <TitleRow
                        label="Technical Skills"
                        value={userData?.skills?.technicalSkills?.join(", ") || "N/A"}
                      />
                      <TitleRow
                        label="Soft Skills"
                        value={userData?.skills?.softSkills?.join(", ") || "N/A"}
                      />
                      <TitleRow
                        label="Languages"
                        value={userData?.skills?.languages?.join(", ") || "N/A"}
                      />
                    </CustomPersonalDetailCard>
                  </Box>
                )}
                {userData?.educationInformation && (
                  <Box
                    width={{ md: "49%", sm: "47%", xs: "100%" }}
                    key={`${id}-education`}
                  >
                    <CustomPersonalDetailCard title="Education Details">
                      <TitleRow
                        label="Field Of Study"
                        value={userData?.educationInformation?.fieldOfStudy || "N/A"}
                      />
                      <TitleRow
                        label="Highest Degree"
                        value={userData?.educationInformation?.highestDegree || "N/A"}
                      />
                      <TitleRow
                        label="Graduation Year"
                        value={userData?.educationInformation?.graduationYear || "N/A"}
                      />
                      <TitleRow
                        label="Institution Name"
                        value={userData?.educationInformation?.institutionName || "N/A"}
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


