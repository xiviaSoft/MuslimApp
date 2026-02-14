import { Tabs, Tab, Box, Typography, Paper, Divider } from "@mui/material";
import { useState } from "react";
import { COLORS } from "@muc/constants"; // Assuming COLORS is defined here

const PhotoAccessTabs = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabTitles = ["User Access", "User Request", "My Access", "My Request"];

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Typography variant="h6" sx={{ padding: 2, mb: "21px" }}>
        Photo Access -{" "}
        <span style={{ color: COLORS.secondary.main, cursor: "pointer" }}>
          {tabTitles[value]}
        </span>
      </Typography>
      <Divider />

      <Tabs
        value={value}
        onChange={handleChange}
        centered
        variant="scrollable"
        sx={{
          "& .MuiTabs-indicator": {
            display: "none",
          },
          "& .MuiTab-root": {
            transition: "0.3s",
          },
          "& .Mui-selected": {
            bgcolor: COLORS.primary.main,
            color: COLORS.white.main,
          },
        }}
      >
        {tabTitles.map((title, index) => (
          <Tab
            key={index}
            label={title}
            sx={{ paddingX: 2, fontWeight: 600 }}
          />
        ))}
      </Tabs>

      <Paper sx={{ textAlign: "center" }}>
        {value === 0 && (
          <>
            <Typography
              variant="body1"
              sx={{ bgcolor: COLORS.gray.lightDarkGray, paddingY: "20px" }}
            >
              Members who have access to view your private photos
            </Typography>
            <Typography variant="body1" sx={{ py: "25px", fontWeight: "bold" }}>
              No members have access to your private photos
            </Typography>
          </>
        )}
        {value === 1 && (
          <>
            <Typography
              variant="body1"
              sx={{ bgcolor: COLORS.gray.lightDarkGray, paddingY: "20px" }}
            >
              Members who have requested to view your private photos
            </Typography>
            <Typography variant="body1" sx={{ py: "25px", fontWeight: "bold" }}>
              You have no private photo requests
            </Typography>
          </>
        )}
        {value === 2 && (
          <>
            <Typography
              variant="body1"
              sx={{ bgcolor: COLORS.gray.lightDarkGray, paddingY: "20px" }}
            >
              Members who's private photos you have access to view
            </Typography>
            <Typography variant="body1" sx={{ py: "25px", fontWeight: "bold" }}>
              You don't have access to any members private photos
            </Typography>
          </>
        )}
        {value === 3 && (
          <>
            <Typography
              variant="body1"
              sx={{ bgcolor: COLORS.gray.lightDarkGray, paddingY: "20px" }}
            >
              Members who's private photos you have requested to view
            </Typography>
            <Typography variant="body1" sx={{ py: "25px", fontWeight: "bold" }}>
              You have not requested to view any members private photos
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default PhotoAccessTabs;
