import { useEffect, useState } from "react";
import { AppLayout } from "@muc/layout";
import { Box, CircularProgress, Container, Grid, Paper, Typography, } from "@mui/material";
import { COLORS } from "@muc/constants";
import { CustomProfileCard } from "@muc/components";
import HomePagination from "../../components/HomePagination/HomePagination";
import { auth, db } from "@muc/libs";
import { arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc } from "firebase/firestore";

const HomeContainer = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addVisits = async (visitedUserId: string) => {
    if (!auth.currentUser?.uid || !visitedUserId) return;
    const currentUserId = auth.currentUser.uid;

    await updateDoc(doc(db, "users", visitedUserId), {
      visits: arrayUnion(currentUserId),
    })
  }
  // const handleLike = async (likedUserId: string) => {
  //   // check both users ids are valid

  //   // push the current user id to the likes array of the liked user

  //   // 3: update the state to reflect the change
  //   setUsers((prevUsers) =>
  //     prevUsers.map((user) =>
  //       user.id === likedUserId
  //         ? { ...user, likes: [...(user.likes || []), auth.currentUser?.uid] }
  //         : user
  //     )
  //   );
  // }

  // const handleRemoveLike = async (likedUserId: string) => {
  //   // check both users ids are valid
  //   // remove the current user id from the likes array of the liked user
  //   // update the state to reflect the change
  // }


  const handleLike = async (likedUserId: string) => {
    if (!auth.currentUser?.uid || !likedUserId) return;
    const currentUserId = auth.currentUser.uid;

    // ✅ Update Firestore
    await updateDoc(doc(db, "users", likedUserId), {
      likes: arrayUnion(currentUserId),
    });

    // ✅ Update state
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === likedUserId
          ? { ...user, likes: [...(user.likes || []), currentUserId] }
          : user
      )
    );
  };

  const handleRemoveLike = async (likedUserId: string) => {
    if (!auth.currentUser?.uid || !likedUserId) return;
    const currentUserId = auth.currentUser.uid;

    // ✅ Update Firestore
    await updateDoc(doc(db, "users", likedUserId), {
      likes: arrayRemove(currentUserId),
    });

    // ✅ Update state
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === likedUserId
          ? { ...user, likes: user.likes.filter((id: string) => id !== currentUserId) }
          : user
      )
    );
  };

  console.log(users, 'this is user in the homeContainer')

  return (
    <AppLayout>
      <Box sx={{ bgcolor: COLORS.gray.main }}>
        <Container
          maxWidth={"lg"}
          disableGutters
          sx={{ mx: "auto", paddingY: "18px" }}
        >
          <Grid container spacing={3} component={Paper} elevation={2}>
            {loading ? (
              <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} p={10} flexDirection={'column'} gap={2} height={400}>

                <CircularProgress />
                <Typography>
                  Loading...
                </Typography>
              </Box>

            ) : (

              users.filter((item) => item.id !== auth.currentUser?.uid).map((item) => (
                <Grid item md={3} sm={4} xs={12} p={2} key={item.id}>
                  <CustomProfileCard
                    id={item.uid}
                    age={item.dateOfBirth}
                    likes={item?.likes || []}
                    // img={item.img}
                    name={item.firstName + item.lastName}
                    countryFlag={item.countryflag}
                    location={item.Companyaddress}
                    onLike={() => handleLike(item.id)}
                    onRemoveLike={() => handleRemoveLike(item.id)}
                    isLiked={item.likes?.includes(auth.currentUser?.uid)}
                    onVisit={() => addVisits(item.id)}
                  />

                </Grid>
              ))

            )}
          </Grid>

          <HomePagination />
        </Container>
      </Box>
    </AppLayout >
  );
};

export default HomeContainer;
