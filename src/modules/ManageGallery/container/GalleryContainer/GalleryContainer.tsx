import { AppLayout } from "@muc/layout";
import GalleryCard from "../../components/GalleryCard/GalleryCard";
import { Box, Container, Stack, Typography, Slider, Grid } from "@mui/material";
import { COLORS } from "@muc/constants";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { CustomButton, CustomMenu, CustomTextField } from "@muc/components";
import { Search } from "@mui/icons-material";
import { useUsers } from "@muc/context";


function valuetext(value: number) {
  return `${value}`;
}


const GalleryContainer = () => {
  const { users: allUsers } = useUsers()


  console.log(allUsers, 'all users in the gallery container')

  const methods = useForm({
    defaultValues: {
      search: "",
      age: [18, 50],
    },
  });

  const submitData = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <AppLayout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitData)}>
          <Box sx={{ bgcolor: COLORS.gray.lightDarkGray, width: "100%" }}>
            <Container
              maxWidth={"lg"}
              disableGutters
              sx={{ bgcolor: COLORS.gray.main }}
            >
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
                  <Stack
                    direction={"row"}
                    sx={{ alignItems: "center", gap: "20px" }}
                  >
                    <Typography width={"80px"} textAlign={"end"}>
                      Age :
                    </Typography>

                    {/* React Hook Form Slider */}
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

              <GalleryCard />
            </Container>
          </Box>
        </form>
      </FormProvider>
    </AppLayout>
  );
};

export default GalleryContainer;
