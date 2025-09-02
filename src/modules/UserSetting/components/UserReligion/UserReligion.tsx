import { CustomButton,
  //  CustomSelect
   } from "@muc/components";
import {
  COLORS,
  // KeepsHalal,
  // PerformsSalaah,
  // PreferHijab,
  // Religiousness,
  // SecData,
} from "@muc/constants";
import { Box,  Paper, Stack, Typography } from "@mui/material";
// import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const UserReligion = () => {
  // const [active, setActive] = useState<number | null>(0);
  // const [activeTwo, setActiveTwo] = useState<number | null>(0);
  // const handleActiveTwo = (i: number) => {
  //   setActiveTwo(i);
  // };
  // const handleActive = (i: number) => {
  //   setActive(i);
  // };

  const methods = useForm();

  return (
    <>
      <Stack
        component={Paper}
        sx={{
          gap: "20px",
          padding: 2,
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          fontSize={"24px"}
          color={COLORS.secondary.main}
        >
          Religion
        </Typography>
        <FormProvider {...methods}>
          {/* <CustomSelect
            name="Sec"
            label="Sec"
            labelOutside={true}
            options={SecData.map((item) => ({
              label: item,
              value: item,
            }))}
          /> */}
          {/* <CustomSelect
            name="Religiousness"
            label="Religiousness"
            labelOutside={true}
            options={Religiousness.map((item) => ({
              label: item,
              value: item,
            }))}
          /> */}
          {/* <CustomSelect
            name="Prefer Hijab/Niqab"
            label="Prefer Hijab/Niqab"
            labelOutside={true}
            options={PreferHijab.map((item) => ({
              label: item,
              value: item,
            }))}
          /> */}
          {/* <Stack direction={"row"} gap={"16px"}>
            <Typography
              sx={{
                fontSize: "16px",
                width: 216,
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              Prefer Beard
            </Typography>
            <ButtonGroup
              sx={{
                display: "flex",
                flexDirection: { sm: "row", xs: "column" },
              }}
            >
              {ButtonData.map((item, i) => (
                <CustomButton
                  title={item}
                  variant="contained"
                  onClick={() => handleActiveTwo(i)}
                  color={i === activeTwo ? COLORS.white.main : COLORS.dark.main}
                  background={
                    i === activeTwo
                      ? "#5cb85c"
                      : " linear-gradient(to bottom, #fff, #e6e6e6)"
                  }
                />
              ))}
            </ButtonGroup>
          </Stack> */}
          {/* <Stack direction={"row"} gap={"16px"}>
            <Typography
              sx={{
                fontSize: "16px",
                width: 216,
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              Is a Revert
            </Typography>
            <ButtonGroup>
              {ButtonData.slice(0, 3).map((item, i) => (
                <CustomButton
                  title={item}
                  variant="contained"
                  onClick={() => handleActive(i)}
                  color={i === active ? COLORS.white.main : COLORS.dark.main}
                  background={
                    i === active
                      ? "#5cb85c"
                      : " linear-gradient(to bottom, #fff, #e6e6e6)"
                  }
                />
              ))}
            </ButtonGroup>
          </Stack> */}
          {/* <CustomSelect
            name="Keeps Halal"
            label="Keeps Halal"
            labelOutside={true}
            options={KeepsHalal.map((item) => ({
              label: item,
              value: item,
            }))}
          /> */}
          {/* <CustomSelect
            name="Performs Salaah"
            label="Performs Salaah"
            labelOutside={true}
            options={PerformsSalaah.map((item) => ({
              label: item,
              value: item,
            }))}
          /> */}
          <Box sx={{ alignSelf: "end" }}>
            <CustomButton
              title="Update"
              variant="contained"
              background={COLORS.secondary.main}
              color={COLORS.white.main}
            />
          </Box>
        </FormProvider>
      </Stack>
    </>
  );
};

export default UserReligion;
// const ButtonData = ["Any", "Yes", "No", "Prefer not to say"];
