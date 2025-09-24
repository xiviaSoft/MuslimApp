import { Box, Typography, Rating, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { COLORS } from "@muc/constants";

type CustomCardProps = {
  img: string;
  name: string;
  rating?: number;
  location?: string;
  profession?: string;
  id: string | number;
  countryFlag?: string;
  age?: string | number;
  // height?: string | number;
  extraPics?: string | number;
};

const CustomCard = ({
  id,
  age,
  img,
  name,
  rating,
  // height,
  // location,
  extraPics,
  profession,
  countryFlag,
}: CustomCardProps) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(`/user_info/${id}`)}
      sx={{
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        // height:height ? height : "100%",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        ":hover": {
          transform: "scale(1.05)",
        },
        position: "relative",

      }}
    >

      <Box
        component="img"
        src={img}
        alt={name}
        sx={{
          width: "100%",

          objectFit: "cover",
        }}
      />


      {extraPics && (
        <Box
          sx={{
            position: "absolute",
            right: "5%",
            top: "55%",
            width: "37px",
            height: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" fontWeight={700}>
            {extraPics}
          </Typography>
        </Box>
      )}


      <Box
        sx={{
          padding: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          // position:'absolute',
          width: '100%',
          // bottom:0,
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: "16px", md: "18px" },
              color: COLORS.primary.main,
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: { xs: "16px", md: "18px" },
              color: COLORS.primary.main,
            }}
          >
            {age}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          sx={{ color: COLORS.gray.lightGray, fontStyle: "italic", mt: 0.5 }}
        >
          {profession}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          {/* <Typography variant="body2" sx={{ color: COLORS.gray.lightGray }}>
            {location}
          </Typography> */}
          {countryFlag && (
            <Box
              component="img"
              src={countryFlag}
              sx={{ width: "20px", height: "14px", borderRadius: "2px" }}
            />
          )}
        </Stack>

        {rating && (
          <Rating
            value={rating}
            precision={0.5}
            size="small"
            sx={{ mt: 1, color: COLORS.primary.main }}
            readOnly
          />
        )}
      </Box>
    </Box>
  );
};

export default CustomCard;
