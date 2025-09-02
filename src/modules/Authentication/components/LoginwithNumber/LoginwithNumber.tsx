import { CustomButton } from "@muc/components";
import { COLORS } from "@muc/constants";
import { FormControl, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const LoginwithNumber = () => {
  const [Phone, setPhone] = useState("");
  return (
    <Stack
      sx={{
        bgcolor: "#a1077f6b",
        width: { xs: "100%", sm: "450px", md: "500px", lg: "585px" }, // responsive widths
        gap: "40px",
        alignItems: "center",
        padding: { xs: "24px", sm: "32px", md: "36px" },
        boxShadow:
          "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19)",
        minHeight: { xs: "auto", md: "604px" },
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        fontSize={{ xs: "20px", sm: "24px", md: "28px" }}
        textAlign="center"
        color={COLORS.white.main}
      >
        Phone Number for login
      </Typography>

      <Typography
        variant="body2"
        color={COLORS.white.main}
        textAlign="center"
        mb={"-10px"}
      >
        The string supplied did not seem to be a phone number.
      </Typography>

      <Stack
        direction="column"
        sx={{
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <FormControl fullWidth>
          <PhoneInput
            defaultCountry="US"
            value={Phone}
            onChange={setPhone}
            inputProps={{
              id: "phone-input",
              name: "phone",
              style: {
                width: "100%",
                height: "50px",
                fontSize: "16px",
                border: "none",
                outline: "none",
                paddingLeft: "8px",
              },
            }}
            countrySelectorStyleProps={{
              buttonStyle: {
                height: "50px",
                border: "none",
                width: "50px",
              },
            }}
          />
        </FormControl>

        <CustomButton
          variant="contained"
          title="SEND LOGIN CODE"
          background={COLORS.primary.main}
          color="white"
          width="100%"
          height="50px"
        />
      </Stack>
    </Stack>
  );
};

export default LoginwithNumber;
