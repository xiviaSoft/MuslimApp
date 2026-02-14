import { CustomUserList } from "@muc/components";
import { COLORS } from "@muc/constants";
import { useUserActivityDetail } from "@muc/utils";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
const LIkeTab = () => {
  const { data: likedUser = [], isLoading } = useUserActivityDetail("liked");

  if (isLoading) {
    return (
      <Box
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
    );
  }
  return (
    <>
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
          Members that I liked
        </Typography>

        <Box>
          <Grid container spacing={2} sx={{ p: 2 }}>
            {likedUser.length > 0 ? (
              likedUser.map((user) => (
                <>
                  <Grid key={user.id} item md={4} sm={6} xs={12}>
                    <CustomUserList
                      bio={user.bio || "No bio available"}
                      name={`${user.firstName || ""} ${user.lastName || ""}`}
                      uid={user.id}
                    />
                  </Grid>
                </>
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{
                  color: COLORS.gray.main,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                No one has liked your profile yet.
              </Typography>
            )}
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default LIkeTab;
