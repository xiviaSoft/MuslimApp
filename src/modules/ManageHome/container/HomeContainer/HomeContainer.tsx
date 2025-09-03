import { useEffect, useState } from "react";
import { AppLayout } from "@muc/layout";
import { Box, Container, Grid, Paper, } from "@mui/material";
import { COLORS } from "@muc/constants";
import { CustomProfileCard } from "@muc/components";
import HomePagination from "../../components/HomePagination/HomePagination";
import { auth, db } from "@muc/libs";
import { collection, getDocs } from "firebase/firestore";

const HomeContainer = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
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
              <p>Loading users...</p>
            ) : (
              // users.map((item, i) => (
              //   <Grid item md={3} sm={4} xs={12} p={2} key={item.id || i}>
              //     <CustomProfileCard
              //       id={item.uid}
              //       age={item.dateOfBirth}
              //       // img={item.img}
              //       name={item.firstName + item.lastName}
              //       countryFlag={item.countryflag}
              //       location={item.Companyaddress}
              //     />
              //   </Grid>
              // ))
              users.filter((item) => item.id !== auth.currentUser?.uid).map((item) => (
                <Grid item md={3} sm={4} xs={12} p={2} key={item.id}>
                  <CustomProfileCard
                    id={item.uid}
                    age={item.dateOfBirth}
                    // img={item.img}
                    name={item.firstName + item.lastName}
                    countryFlag={item.countryflag}
                    location={item.Companyaddress}
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
