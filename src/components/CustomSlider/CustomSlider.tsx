import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Stack } from "@mui/material";
import { COLORS, sliderData, sliderSetting } from "@muc/constants";
import { useNavigate } from "react-router";

interface FadeProps {
  isButton?: boolean;
}

function Fade({ isButton }: FadeProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/loging");
  };

  return (
    <Box position={"relative"} className="slider-container">
      <Slider {...sliderSetting}>
        {sliderData.map((item, i) => (
          <Box
            key={i}
            component={"img"}
            src={item.img}
            alt="Slide"
            sx={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
              display: "block",
            }}
          />
        ))}
      </Slider>

      {isButton && (
        <Stack
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%,-50%)`,
          }}
        >
          <Button
            onClick={handleNavigate}
            sx={{
              bgcolor: COLORS.primary.main,
              color: "white",
              width: "386px",
              borderRadius: "30px",
              height: "54px",
              fontSize: "24px",
              mb: "16px",
            }}
          >
            LOGING
          </Button>
          <Button
            sx={{
              bgcolor: COLORS.secondary.main,
              color: "white",
              width: "386px",
              borderRadius: "30px",
              height: "54px",
              fontSize: "24px",
              mb: "16px",
            }}
          >
            REGISTER
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default Fade;
