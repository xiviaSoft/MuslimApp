import { CustomButton, CustomTextField } from "@muc/components";
import { COLORS } from "@muc/constants";
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const ChangePhoneNumber = () => {
  const methods = useForm();
  const [phone, setPhone] = useState("");

  return (
    <>
      <Stack>
        <Typography
          variant="h6"
          fontSize={"24px"}
          color={COLORS.gray.darkGray}
          mb={"21px"}
        >
          Change Phone
        </Typography>
        <Divider />
        <Stack
          sx={{
            width:{md:'700px',sm:'500px',xs:'100%'},
            mx: "auto",
            mt: "44px",
            gap:3
          }}
        >
          <FormControl fullWidth>
            <Box display="flex" alignItems="center" gap={2}>
              <FormLabel
                htmlFor="phone-input"
                sx={{ width: "185px", textAlign: "end" }}
              >
                Phone Number :
              </FormLabel>
              <PhoneInput
                defaultCountry="US"
                value={phone}
                onChange={setPhone}
                inputProps={{
                  id: "phone-input",
                  name: "phone",
                  style: {
                    width: "460px",
                  },
                }}
              />
            </Box>
          </FormControl>
          <FormProvider {...methods}>
            <CustomTextField
              type="number"
              name="Verification code"
              label="Verification code"
              placeholder="verification code"
            />
            <CustomTextField type="password" name="password" label="password"  placeholder="password"/>
            <Stack spacing={3} mt={2} width="100%" alignItems={"end"}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <CustomButton
                  title="Update"
                  variant="contained"
                  background={COLORS.secondary.main}
                  color={COLORS.white.main}
                />
              </Box>
              <Typography color={COLORS.secondary.main}>
                Send me a <b>One-time Password</b>
              </Typography>
            </Stack>
          </FormProvider>
        </Stack>
      </Stack>
    </>
  );
};
export default ChangePhoneNumber;
