import { AppLayout } from "@muc/layout";
import React from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";
import { COLORS } from "@muc/constants";
import {
  FavoriteBorderRounded,
  FavoriteRounded,
  VisibilityRounded,
} from "@mui/icons-material";
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
      <Box sx={{ bgcolor: COLORS.gray.lightDarkGray, pb: 6, pt: 6 }}>
        <Container maxWidth="lg">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            sx={{
              "& .MuiTabs-indicator": {
                display: "none", // remove underline
              },
              "& .MuiTab-root": {
                textTransform: "none",
                borderRadius: "12px",
                minHeight: "55px",
                px: 3,
                mr: 2,
                fontWeight: 600,
                color: COLORS.gray.lightGray,
                backgroundColor: COLORS.white.main,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: COLORS.gray.main,
                  color: COLORS.dark.darkblack,
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                },
              },
              "& .Mui-selected": {
                backgroundColor: COLORS.secondary.main,
                color: COLORS.white.grayWhite,
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                transform: "translateY(-2px)",
              },
            }}
          >
            {tabsData.map((item, i) => (
              <Tab
                key={i}
                icon={item.icon}
                iconPosition="start"
                label={item.title}
              />
            ))}
          </Tabs>

          <Box mt={4}>
            {value === 0 && <LIkeTab />}
            {value === 1 && <LikeMeTab />}
            {/* {value === 2 && <LikeMeTab />} */}
            {value === 2 && <VistorTab />}
          </Box>
        </Container>
      </Box>
    </AppLayout>
  );
};

export default LikesContainer;

const tabsData = [
  {
    value: 0,
    icon: <FavoriteBorderRounded sx={{ fontSize: 22 }} />,
    title: "I Like",
  },
  {
    value: 1,
    icon: <FavoriteRounded sx={{ fontSize: 22 }} />,
    title: "Likes Me",
  },
  // {
  //   value: 2,
  //   icon: <PeopleAltRounded sx={{ fontSize: 22 }} />,
  //   title: "Matches",
  // },
  {
    value: 2,
    icon: <VisibilityRounded sx={{ fontSize: 22 }} />,
    title: "Visitors",
  },
];
