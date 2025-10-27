import { AppLayout } from "@muc/layout";
import {
  Box,
  Container,
  Stack,
  Typography,
  Slider,
  Grid,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import { COLORS } from "@muc/constants";
import { FormProvider, useForm, Controller } from "react-hook-form";
import {
  CustomButton,
  // CustomMenu,
  CustomProfileCard,
  CustomTextField,
} from "@muc/components";
import { Search } from "@mui/icons-material";
import { User, useUsers } from "@muc/context";
import { auth } from "@muc/libs";
import { useState, useEffect } from "react";
import { calculateAge, useUserActions } from "@muc/utils";

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
  }, [allUsers, currentUserId]);

  const methods = useForm({
    defaultValues: {
      search: "",
      age: [18, 50],
    },
  });

  const submitData = (data: any) => {
    const { search, age } = data;
    const [minAge, maxAge] = age;

    const filtered = allUsers.filter((user: User) => {
      if (user.id === currentUserId) return false;

      const matchesSearch = search
        ? `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase())
        : false;


      const userAge = calculateAge(user.dateOfBirth);
      const matchesAge =
        userAge !== null && userAge >= minAge && userAge <= maxAge;

      return matchesSearch && matchesAge;
    });

    setFilteredUsers(filtered);
  };


  return (
    <AppLayout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitData)}>
          <Box sx={{ bgcolor: COLORS.gray.lightDarkGray, minHeight: "100vh" }}>
            <Container maxWidth="lg" disableGutters sx={{ py: 3 }}>

              <Box textAlign="center" mb={4}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: COLORS.dark.grayblack,
                  }}
                >
                  Gallery Search
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, color: COLORS.gray.darkGray }}
                >
                  Browse and connect with users that match your search
                </Typography>
              </Box>

              {/* Filters Toolbar */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${COLORS.gray.main}`,
                  backgroundColor: COLORS.white.main,
                  mb: 3,
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item md={4} sm={6} xs={12}>
                    <CustomTextField
                      showSearchIcon
                      name="search"
                      placeholder="Search by name"
                      type="text"
                    />
                  </Grid>

                  {/* <Grid item md={4} sm={6} xs={12}>
                    <CustomMenu />
                  </Grid> */}

                  <Grid item md={4} sm={12} xs={12} sx={{ ml: 'auto' }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                    >
                      <Typography
                        fontWeight={500}
                        fontSize="14px"
                        color={COLORS.gray.darkGray}
                      >
                        Age:
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
                            sx={{ maxWidth: 160 }}
                          />
                        )}
                      />
                      <CustomButton
                        title="Search"
                        icon={<Search />}
                        background={COLORS.primary.main}
                        color="white"
                        type="submit"
                        variant="contained"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              <Divider sx={{ mb: 3 }} />

              {/* Results */}
              {isLoading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  height="50vh"
                  gap={2}
                >
                  <CircularProgress size={36} />
                  <Typography variant="body2" color={COLORS.gray.darkGray}>
                    Loading users...
                  </Typography>
                </Box>
              ) : isError ? (
                <Typography textAlign="center" color="error" sx={{ py: 5 }}>
                  Error loading users
                </Typography>
              ) : filteredUsers.length === 0 ? (
                <Box
                  sx={{
                    width: "100%",
                    height: "50vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >
                  <Typography
                    sx={{
                      color: COLORS.gray.darkGray,
                      fontSize: "18px",
                      opacity: 0.8,
                    }}
                  >
                    No results found
                  </Typography>
                  <Typography variant="body2" color={COLORS.gray.lightDarkGray}>
                    Try adjusting your search filters
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {filteredUsers.map((item) => (
                    <Grid item md={3} sm={4} xs={12} key={item.id}>
                      <CustomProfileCard
                        id={item.id}
                        age={item.dateOfBirth}
                        likes={item?.likes || []}
                        name={`${item.firstName} ${item.lastName}`}
                        onLike={() => likeUser.mutate(item.id)}
                        onRemoveLike={() => removeLike.mutate(item.id)}
                        isLiked={item.likes?.includes(auth.currentUser?.uid)}
                        onVisit={() => addVisit.mutate(item.id)}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </Box>
        </form>
      </FormProvider>
    </AppLayout>
  );
};

export default GalleryContainer;
