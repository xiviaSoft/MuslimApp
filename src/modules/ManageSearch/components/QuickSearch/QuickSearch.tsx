import { CustomButton, CustomSelect } from "@muc/components";
import {
  AgeNumber,
  COLORS,
  CountriesName,
  FilterResult,
  ProfileRating,
  SortOption,
} from "@muc/constants";
import { Female, Male, Transgender } from "@mui/icons-material";
import { Box, ButtonGroup, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface GenderButtonType {
  title: string;
  icon: JSX.Element;
}
const QuickSearch = () => {
  const [active, setActive] = useState<number | null>(0);

  const GenderButton: GenderButtonType[] = [
    {
      title: "any Gender",
      icon: <Transgender />,
    },
    {
      title: "Male",
      icon: <Male />,
    },
    {
      title: "Female",
      icon: <Female />,
    },
  ];

  const handleActive = (i: number): void => {
    setActive(i);
  };
  const methods = useForm();

  return (
    <>
      <FormProvider {...methods}>
        <Stack direction={"row"} gap={"16px"}>
          <Typography
            sx={{
              fontSize: "16px",
              width: 185,
              textAlign: "end",
              alignSelf: "center",
            }}
          >
            Gender :
          </Typography>
          <ButtonGroup
            sx={{ display: "flex", flexDirection: { sm: "row", xs: "column" } }}
          >
            {GenderButton.map((item, i) => (
              <CustomButton
                onClick={() => handleActive(i)}
                title={item.title}
                variant="contained"
                endIcon={item.icon}
                color={i === active ? COLORS.white.main : COLORS.dark.main}
                background={
                  i === active
                    ? "#5cb85c"
                    : " linear-gradient(to bottom, #fff, #e6e6e6)"
                }
                width="149px"
                height="34px"
              />
            ))}
          </ButtonGroup>
        </Stack>
        <CustomSelect
          name="Miximum Age"
          label="Minimum Age"
          labelOutside={true}

          options={AgeNumber.map((age) => ({
            label: age.toString(),
            value: age.toString(),
          }))}
        />
        <CustomSelect
          name="Miximum Age"
          label="Miximum Age"
          labelOutside={true}
          options={AgeNumber.map((age) => ({
            label: age.toString(),
            value: age.toString(),
          }))}
        />
        <CustomSelect
          name="Country"
          label="Country"
          labelOutside={true}
          options={CountriesName.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <CustomSelect
          name="Profile Rating"
          label="Profile Rating"
          labelOutside={true}
          options={ProfileRating.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <CustomSelect
          name="Filter Results"
          label="Filter Results"
          labelOutside={true}
          options={FilterResult.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <CustomSelect
          name="Sort Option"
          label="Sort Option"
          labelOutside={true}
          options={SortOption.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <Box sx={{ alignSelf: "end" }}>
          <CustomButton
            title="Search Now"
            variant="contained"
            background="#5cb85c"
            color={COLORS.white.main}
          />
        </Box>
      </FormProvider>
    </>
  );
};

export default QuickSearch;
