import { AppLayout } from "@muc/layout";
import React from "react";
import { Box, Button, Container, Tab, Tabs } from "@mui/material";
import { COLORS } from "@muc/constants";
import { JoinLeft, Visibility, VolunteerActivism } from "@mui/icons-material";
import LikeMeTab from "../../components/LIkeMeTab/LikeMeTab";
import LIkeTab from "../../components/LIkeTab/LIkeTab";
import VistorTab from "../../components/VistorTab/VistorTab";

const LikesContainer = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <AppLayout>
      <Box sx={{ bgcolor: COLORS.gray.lightDarkGray, pb: "30px", pt: "50px" }}>
        <Container maxWidth={"lg"}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            sx={{
              ".MuiTabs-indicator": {
                top: 0,
                bottom: "auto",
                bgcolor: COLORS.secondary.main,
              },
              borderBottom: "none",
            }}
            aria-label="secondary tabs example"
          >
            {tabsData.map((item, i) => (
              <Tab
                sx={{
                  bgcolor: value === i ? COLORS.white.main : COLORS.gray.main,
                  marginRight: "7px",
                  width: "228px",
                  height: "55px",
                  borderTop:
                    value === i
                      ? `3px solid ${COLORS.secondary.main}`
                      : "transparent",
                }}
                value={item.value}
                label={
                  <Button
                    sx={{ color: COLORS.gray.lightGray, fontWeight: 700 }}
                    startIcon={item.icon}
                  >
                    {item.title}
                  </Button>
                }
              />
            ))}
          </Tabs>
          {value === 0 && <Box>{<LIkeTab />}</Box>}
          {value === 1 && <Box>{<LikeMeTab />}</Box>}
          {value === 2 && <Box>{<LikeMeTab />}</Box>}
          {value === 3 && <Box>{<VistorTab />}</Box>}
        </Container>
      </Box>
    </AppLayout>
  );
};

export default LikesContainer;

const tabsData = [
  {
    value: 0,
    icon: <VolunteerActivism />,
    title: "I Like",
  },
  {
    value: 1,
    icon: <VolunteerActivism />,
    title: "Likes Me",
  },
  {
    value: 2,
    icon: <JoinLeft />,
    title: "Matches",
  },
  {
    value: 3,
    icon: <Visibility />,
    title: "Vistors",
  },
];
