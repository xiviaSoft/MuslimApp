import { CustomCard } from "@muc/components";
import { userData } from "@muc/constants";
import { Grid, Paper, Stack } from "@mui/material";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import { useState } from "react";
// import { AvTimer, Language, WhereToVote } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { CustomButton } from "@muc/components";

const ProfileCard = () => {
  // const [value, setValue] = useState<number>(1);
  const Navigate = useNavigate();

  // const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };

  return (
    <Paper>
      {/* <Tabs
        value={value}
        component={Stack}
        direction={"row"}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        centered
        sx={{ width: "100%" }}
      > */}
      {/* {TabsLabel.map((item) => (
          <Tab
            key={item.value}
            sx={{
              color: COLORS.gray.darkGray,
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: 0,
              justifyContent: "center",
              direction: { sm: "row", xs: "column" },
            }}
            value={item.value}
            icon={item.icon}
            label={item.title}
          />
        ))} */}
      {/* </Tabs> */}

      {/* {value === 1 && ( */}
      <Stack
        direction={"row"}
        sx={{
          flexWrap: "wrap",
          mx: "auto",
          // bgcolor: COLORS.red.main,
          gap: "16px",
          padding: { md: "40px", sm: "0px", xs: "0px" },
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Grid container spacing={3}>
          {userData.map((item) => (
            <Grid md={3} p={2}>
              <CustomCard
                key={item.name}
                name={item.name}
                age={item.age}
                img={item.img}
                location={item.location}
                countryFlag={item.countryflag}
                id={item?.id}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      {/* )} */}

      {/* {value === 2 && <div>Content for Item Two</div>}
      {value === 3 && <div>Content for Item Three</div>} */}
      <CustomButton
        onClick={() => Navigate("/gallery")}
        title="View all"
        variant="contained"
        width="100%"
        height="56px"
      />
    </Paper>
  );
};

export default ProfileCard;

// const TabsLabel = [
//   {
//     icon: <Language />,
//     title: "Online",
//     value: 1,
//   },
//   {
//     icon: <WhereToVote />,
//     title: "Near by",
//     value: 2,
//   },
//   {
//     icon: <AvTimer />,
//     title: "Latest",
//     value: 3,
//   },
// ];
