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
        width: "585px",
        gap: "50px",
        alignItems: "center",
        paddingY: "36px",
        boxShadow:
          "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19)",
        minHeight: "604px",
      }}
    >
      <Typography variant="h3" color={COLORS.white.main}>
        Phone Number for login
      </Typography>

      <Typography variant="body2" color={COLORS.white.main} mb={"-20px"}>
        The string supplied did not seem to be a phone number.
      </Typography>

      <Stack
        direction={"column"}
        sx={{
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          height: "70px",
          minHeight: "70px",
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
                height: "100%",
                fontSize: "18px",
                border: "none",
                outline: "none",
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
          width="350px"
          height="56px"
        />
      </Stack>
    </Stack>
  );
};

export default LoginwithNumber;
