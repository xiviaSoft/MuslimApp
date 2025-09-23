import { AppLayout } from "@muc/layout";
import { Box, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import { COLORS } from "@muc/constants";
import { CustomProfileCard } from "@muc/components";
import HomePagination from "../../components/HomePagination/HomePagination";
import { auth, db } from "@muc/libs";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { QueryClient, useMutation, } from "@tanstack/react-query";
import { User } from "@muc/collections";
import { useUsers } from "@muc/context";



const queryClient = new QueryClient();

const HomeContainer = () => {

  const { users: allUsers, isError, isLoading } = useUsers()


  const addVisits = useMutation({
    mutationFn: async (visitedUserId: string) => {
      if (!auth.currentUser?.uid || !visitedUserId) {
        throw new Error('User not authenticated or invalid visitedUserId');
      }
      const currentUserId = auth.currentUser.uid;
      await updateDoc(doc(db, "users", visitedUserId), {
        visits: arrayUnion(currentUserId),
      });
      return { visitedUserId, currentUserId };
    },
    onSuccess: ({ visitedUserId, currentUserId }: { visitedUserId: string; currentUserId: string }) => {
      // update in the cache
      queryClient.setQueryData(["users"], (oldData: User[]) => {
        if (!oldData) return [];
        return oldData.map((user) => {
          if (user.uid === visitedUserId) {
            if (!user.visits?.includes(currentUserId) && user.visits) {
              return { ...user, visits: [...user?.visits, currentUserId] };
            }
          }
          return user;
        });
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const likedUser = useMutation({
    mutationFn: async (likedUserId: string) => {
      if (!auth.currentUser?.uid || !likedUserId) return;
      const currentUserId = auth.currentUser.uid;

      await updateDoc(doc(db, "users", likedUserId), {
        likes: arrayUnion(currentUserId),
      });

      await updateDoc(doc(db, "users", currentUserId), {
        liked: arrayUnion(likedUserId),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const removeLike = useMutation({
    mutationFn: async (likedUserId: string) => {
      if (!auth.currentUser?.uid || !likedUserId) return;
      const currentUserId = auth.currentUser.uid;
      await updateDoc(doc(db, "users", likedUserId), {
        likes: arrayRemove(currentUserId),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  console.log(allUsers)
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
                      onLike={() => likedUser.mutate(item.id)}
                      onRemoveLike={() => removeLike.mutate(item.id)}
                      isLiked={item.likes?.includes(auth.currentUser?.uid)}
                      onVisit={() => addVisits.mutate(item.id)}
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
