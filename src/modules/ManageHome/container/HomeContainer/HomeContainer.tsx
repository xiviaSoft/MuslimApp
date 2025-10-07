import { AppLayout } from "@muc/layout";
import { Box, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import { COLORS } from "@muc/constants";
import { CustomProfileCard } from "@muc/components";
import HomePagination from "../../components/HomePagination/HomePagination";
import { auth, } from "@muc/libs";
import { useUsers } from "@muc/context";
import { useUserActions } from "@muc/utils";

const HomeContainer = () => {
  const { addVisit, likeUser, removeLike } = useUserActions()
  const { users: allUsers, isError, isLoading } = useUsers()
  console.log(allUsers, 'alluser in the home')
  return (
    <AppLayout>
      <Box sx={{ bgcolor: COLORS.gray.main }}>
        <Container maxWidth="lg" disableGutters sx={{ mx: "auto", py: 2 }}>
          <Grid container spacing={3} component={Paper} elevation={2}>
            {isLoading ? (
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
            ) : isError ? (
              <Typography>Error loading users</Typography>
            ) : (
              allUsers
                .filter((item) => item.id !== auth.currentUser?.uid)
                .map((item) => (
                  <Grid item md={3} sm={4} xs={12} p={2} key={item.id}>
                    <CustomProfileCard
                      id={item.id}
                      age={item.dateOfBirth}
                      likes={item?.likes || []}
                      name={`${item.firstName} ${item.lastName}`}
                      countryFlag={item.countryflag}
                      location={item.Companyaddress}
                      onLike={() => likeUser.mutate(item.id)}
                      onRemoveLike={() => removeLike.mutate(item.id)}
                      isLiked={item.likes?.includes(auth.currentUser?.uid)}
                      onVisit={() => addVisit.mutate(item.id)}
                    />
                  </Grid>
                ))
            )}
          </Grid>

          <HomePagination />
        </Container>
      </Box>
    </AppLayout>
  );
};

export default HomeContainer;