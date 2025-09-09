import { CustomUserList } from "@muc/components";
import { COLORS } from "@muc/constants";
import { auth, db } from "@muc/libs";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const LikeMeTab = () => {
  const [likeUsers, setLikeUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchLikes = async () => {
      if (!auth.currentUser?.uid) return;

      // get my user document
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const likeIds: string[] = userSnap.data().likes || [];
      console.log(likeIds, 'this is like ids');

      if (likeIds.length === 0) {
        setLikeUsers([]);
        return;
      }

      // directly query users with __name__ in likeIds (works up to 10)
      const q = query(collection(db, "users"), where("__name__", "in", likeIds));
      const snap = await getDocs(q);

      const users = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLikeUsers(users);
    };

    fetchLikes();
  }, []);
  console.log(likeUsers, length, 'this is like users');

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
        Members that have liked my profile
      </Typography>

      <Box>
        <Grid container spacing={2} sx={{ p: 2 }}>
          {likeUsers.length > 0 ? (
            likeUsers.map((user) => (
              <Grid key={user.id} item md={4} sm={6} xs={12}>
                <CustomUserList
                  bio={user.bio || "No bio available"}
                  name={`${user.firstName || ""} ${user.lastName || ""}`}
                />
              </Grid>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{ color: COLORS.gray.main, textAlign: "center", width: "100%" }}
            >
              No one has liked your profile yet.
            </Typography>
          )}
        </Grid>
      </Box>
    </Stack>
  );
};

export default LikeMeTab;
