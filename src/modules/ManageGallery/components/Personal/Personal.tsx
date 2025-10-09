import { CustomButton, CustomSelect } from "@muc/components";
import {
  BuildOptions,
  COLORS,
  Countries,
  Disabilities,
  EyeColors,
  HairColors,
  HasChilldren,
  HeightOptions,
  LivingArrangements,
  LookingToMarry,
  MARITAL_STATUS,
  // MaritalStatus,
  Relocate,
  Smoke,
  WantsChildren,
} from "@muc/constants";
import {  ButtonGroup, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
const Personal = () => {
  const [active, setActive] = useState<number | null>(0);
  const handleActive = (i: number): void => {
    setActive(i);
  };
  const methods = useForm();
  return (
    <Stack gap={"16px"}>
      <FormProvider {...methods}>
        <CustomSelect
          name="Country of Origin"
          label="Country of Origin"
          labelOutside={true}
          options={Countries.map((item) => ({
            label: item,
            value: item,
          }))}
        />{" "}
        <CustomSelect
          name="Current Citizenship"
          label="Current Citizenship"
          labelOutside={true}
          options={Countries.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <CustomSelect
          name="Will Relocate"
          label="Will Relocate"
          labelOutside={true}
          options={Relocate.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <Stack direction={"row"} gap={"16px"}>
          <Typography
            sx={{
              fontSize: "16px",
              width: 185,
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            Smokes
          </Typography>
          <ButtonGroup
            sx={{ display: "flex", flexDirection: { sm: "row", xs: "column" } }}
          >
            {Smoke.map((item, i) => (
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
        </Stack>
        <CustomSelect
          name="Looking to Marry"
          label="Looking to Marry"
          labelOutside={true}
          options={LookingToMarry.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <CustomSelect
          name="Marital Status"
          label="Marital Status"
          labelOutside={true}
          options={MARITAL_STATUS.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <CustomSelect
          name="Has Children"
          label="Has Children"
          labelOutside={true}
          options={HasChilldren.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <CustomSelect
          name="Wants Children"
          label="Wants Children"
          labelOutside={true}
          options={WantsChildren.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <CustomSelect
          name="Build"
          label="Build"
          labelOutside={true}
          options={BuildOptions.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <CustomSelect
          name="Hair Colour"
          label="Hair Colour"
          labelOutside={true}
          options={HairColors.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <CustomSelect
          name="Living Arrangements"
          label="Living Arrangements"
          labelOutside={true}
          options={LivingArrangements.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <CustomSelect
          name="Eye Colour"
          label="Eye Colour"
          labelOutside={true}
          options={EyeColors.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <CustomSelect
          name="Minimum Height"
          label="Minimum Height"
          labelOutside={true}
          options={HeightOptions.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <CustomSelect
          name="Maximum Height"
          label="Maximum Height"
          labelOutside={true}
          options={HeightOptions.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <CustomSelect
          name="Disabilities"
          label="Disabilities"
          labelOutside={true}
          options={Disabilities.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      
      
      </FormProvider>
    </Stack>
  );
};

export default Personal;
