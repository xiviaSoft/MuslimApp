import { CustomUserList } from "@muc/components";
import { COLORS } from "@muc/constants";
import { useUserActivityDetail } from "@muc/utils";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";

const VisitorTab = () => {
    const { data: visitorUsers = [], isLoading } = useUserActivityDetail("visits");
       if (isLoading) {
          return <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={10}
            flexDirection="column"
            gap={2}
            height={400}
          >
            <CircularProgress />
            <Typography>Loading...</Typography>
          </Box>
        }
    
    return (
        <Stack
            sx={{
                bgcolor: "white",
                padding: "20px",
                mb: "20px",
                width: "100%",
            }}
        >
            <Typography
                variant="h6"
                component={"h3"}
                sx={{ color: COLORS.gray.lightGray, padding: "8px 16px" }}
            >
                Members that have visited my profile
            </Typography>   
                <Box>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                        {visitorUsers.length > 0 ? (
                            visitorUsers.map((user) => (
                                <Grid key={user.id} item md={4} sm={6} xs={12}>
                                    <CustomUserList
                                        bio={user.bio || "no bio available"}
                                        name={`${user.firstName || ""} ${user.lastName || ""}`}
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Typography
                                variant="body1"
                                sx={{ color: COLORS.gray.main, textAlign: "center", width: "100%" }}
                            >
                                No one has visited your profile yet.
                            </Typography>
                        )}
                    </Grid>
                </Box>
            
        </Stack>
    );
};

export default VisitorTab;