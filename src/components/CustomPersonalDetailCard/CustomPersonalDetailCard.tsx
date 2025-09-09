import { COLORS } from "@muc/constants";
import { Box, Paper, Stack, Typography } from "@mui/material";

interface CustomPersonalDetailCardProps {
  title?: string;
  children?: React.ReactNode;
}

// helper: handle firestore Timestamp

const CustomPersonalDetailCard = ({ title, children }: CustomPersonalDetailCardProps) => {
  // const { uid, isSuspended, bio, createdAt, dateOfBirth, email, firstName, lastName, gender, highestDegree, isActive, maritalStatus, lastLogin, likes, socialLinks, visits,
  //   workExperience, phoneNumber, languages, Skills, updatedAt, religion, ...allData } = data || {};
  return (
    <Stack
      component={Paper}
      sx={{ padding: "20px", width: "100%", height: "100%" }}
    >
      <Box sx={{ paddingX: { sm: "16px", xs: 0 } }}>
        {title && (
          <Typography
            variant="h2"
            sx={{ fontWeight: 500, color: COLORS.primary.main, pb: "10px" }}
          >
            {title}
          </Typography>
        )}
        <Box>
          {children}
        </Box>
        {/* {data ? (
          Object.entries(allData).map(([key, value]) => (
            <Stack direction="row" gap="30px" pb="10px" key={key}>
              <Typography
                color={COLORS.primary.main}
                sx={{ width: "50%", textTransform: "capitalize" }}
              >
                {key}
              </Typography>
              <Typography color={COLORS.dark.main}>
                {formatValue(value)}
              </Typography>
            </Stack>
          ))
        ) : (
          <Typography color={COLORS.dark.main}>No details available</Typography>
        )} */}

      </Box>
    </Stack>
  );
};

export default CustomPersonalDetailCard;
