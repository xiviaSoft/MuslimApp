import { CustomButton, CustomSelect } from "@muc/components";
import { AgeNumber, COLORS, CountriesName, Professions } from "@muc/constants";
import { Female, Male, Transgender } from "@mui/icons-material";
import { ButtonGroup, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Profession = () => {
  const [active, setActive] = useState<number | null>(0);

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
          <ButtonGroup sx={{display:'flex',flexDirection:{sm:'row',xs:'column'}}}>
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
          name="Profession"
          label="Profession"
          labelOutside={true}
          options={Professions.map((item) => ({
            label: item,
            value: item,
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
      </FormProvider>
    </>
  );
};

export default Profession;

const GenderButton = [
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
