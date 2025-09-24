import { AppLayout } from "@muc/layout";
import { Box, Container, Stack, Typography, Slider, Grid, Paper, CircularProgress } from "@mui/material";
import { COLORS } from "@muc/constants";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { CustomButton, CustomMenu, CustomProfileCard, CustomTextField } from "@muc/components";
import { Search } from "@mui/icons-material";
import { User, useUsers } from "@muc/context";
import { auth, } from "@muc/libs";
import { useState, useEffect } from "react";
import { useUserActions } from "@muc/utils";



function valuetext(value: number) {
  return `${value}`;
}
const GalleryContainer = () => {
  const { users: allUsers, isError, isLoading } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const currentUserId = auth.currentUser?.uid ?? null;
  const { addVisit, likeUser, removeLike } = useUserActions();

  useEffect(() => {
    if (!currentUserId) {
      setFilteredUsers(allUsers);
      return;
    }

    setFilteredUsers(allUsers.filter((user) => user.id !== currentUserId));
  }, [allUsers]);

  const submitData = (data: any) => {
    const { search, } = data;
    // const [minAge, maxAge] = age;

    const filtered = allUsers.filter((user: any) => {
      if (user.id === currentUserId) return false;

      const matchesSearch = search
        ? `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase())
        : true;

      // const userAge = getAge(user.dateOfBirth);
      // const matchesAge = userAge >= minAge && userAge <= maxAge;

      return matchesSearch;
    });

    setFilteredUsers(filtered);
  };

  const methods = useForm({
    defaultValues: {
      search: "",
      age: [18, 50],
    },
  });


  return (
    <AppLayout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitData)}>
          <Box sx={{ bgcolor: COLORS.gray.lightDarkGray, width: "100%" }}>
            <Container maxWidth={"lg"} disableGutters sx={{ bgcolor: COLORS.gray.main }}>
              <Typography
                variant="h2"
                sx={{
                  color: COLORS.dark.grayblack,
                  fontWeight: 500,
                  padding: "5px",
                  textAlign: "center",
                  marginTop: "6px",
                }}
              >
                Gallery Search
              </Typography>

              <Grid container padding={2}>
                <Grid item md={4} sm={6} xs={12}>
                  <CustomTextField
                    showSearchIcon
                    name="search"
                    placeholder="search"
                    type="text"
                  />
                </Grid>

                <Grid item md={4} sm={6} xs={12}>
                  <CustomMenu />
                </Grid>

                <Grid item md={4} sm={6} xs={12}>
                  <Stack direction={"row"} sx={{ alignItems: "center", gap: "20px" }}>
                    <Typography width={"80px"} textAlign={"end"}>
                      Age :
                    </Typography>

                    <Controller
                      name="age"
                      control={methods.control}
                      render={({ field }) => (
                        <Slider
                          {...field}
                          value={field.value}
                          onChange={(_, newValue) => field.onChange(newValue)}
                          valueLabelDisplay="auto"
                          min={18}
                          max={100}
                          getAriaValueText={valuetext}
                          sx={{ width: { sm: "200px", xs: "190px" } }}
                        />
                      )}
                    />

                    <CustomButton
                      title="Search"
                      icon={<Search />}
                      background={COLORS.primary.main}
                      color={"white"}
                      type="submit"
                      variant="contained"
                    />
                  </Stack>
                </Grid>
              </Grid>

              <Box sx={{ bgcolor: COLORS.gray.main }}>
                <Container maxWidth="lg" disableGutters sx={{ mx: "auto", py: 2 }}>
                  <Grid container component={Paper} elevation={2}>
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
                    ) : (filteredUsers.length === 0 ? <Box sx={{ width: '100%', height: '40vh', display: 'grid', placeItems: 'center' }}>

                      <Typography sx={{ color: COLORS.gray.darkGray, fontSize: '30px', opacity: '.8' }}>
                        Search Not Found
                      </Typography>
                    </Box>
                      :
                      filteredUsers.map((item) => (
                        <Grid item md={3} sm={4} xs={12} p={2} key={item.id}>
                          <CustomProfileCard
                            id={item.id}
                            age={item.dateOfBirth}
                            likes={item?.likes || []}
                            name={`${item.firstName} ${item.lastName}`}
                            onLike={() => likeUser.mutate(item.id)}
                            onRemoveLike={() => removeLike.mutate(item.id)}
                            isLiked={item.likes?.includes(auth.currentUser?.uid)}
                            onVisit={() => addVisit.mutate(item.id)}
                          // likeLoading={likedUser.isPending}

                          />

                        </Grid>
                      ))
                    )}
                  </Grid>
                </Container>
              </Box>
            </Container>
          </Box>
        </form>
      </FormProvider>
    </AppLayout>
  );
};

export default GalleryContainer;
