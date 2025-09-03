import { CustomMenu, } from "@muc/components";
import { COLORS } from "@muc/constants";


import { Slider, Stack, Typography } from "@mui/material";

import DeepSearchDialog from "../DeepSearchDialog/DeepSearchDialog";
import { useState } from "react";

function valuetext(value: number) {
  return `${value}`;
}

const SearchFilter = () => {
  // const [active, setActive] = useState<number | null>(0);
  const [value, setValue] = useState<number[]>([18, 29]);
  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  // const handleActive = (i: number): void => {
  //   setActive(i);
  // };

  return (
    <>

      <Typography
        variant="h2"
        sx={{
          color: COLORS.dark.grayblack,
          fontWeight: 500,
          padding: "5px",
          textAlign: "center",
          marginTop: "6px",
        }}
      >
        Gallery Search
      </Typography>
      <Stack
        direction={"row"}
        sx={{
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
          padding: "20px 10px 18px 19px",
          // justifyContent: "space-between",
          bgcolor: COLORS.white.main,
          width: '100%',
        }}
      >
        <DeepSearchDialog />
        {/* <Stack direction={"row"} gap={"16px"} alignItems={"center"} justifyContent={'center'}>
          <Typography
            sx={{
              fontSize: "16px",
              textAlign: "end",
              whiteSpace: "nowrap",
              width:'80px'
            }}
          >
            Show Me :
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
                // width="149px"
                height="34px"
              />
            ))}
          </ButtonGroup>
        </Stack> */}
        <CustomMenu />
        <Stack direction={"row"} sx={{ alignItems: "center", gap: "20px" }}>
          <Typography width={'80px'} textAlign={'end'}>Age : </Typography>
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={18}
            max={100}
            getAriaValueText={valuetext}
            sx={{ width: { sm: '200px', xs: '190px' } }}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default SearchFilter;

// const GenderButton = [
//   {
//     title: "any Gender",
//     icon: <Transgender />,
//   },
//   {
//     title: "Male",
//     icon: <Male />,
//   },
//   {
//     title: "Female",
//     icon: <Female />,
//   },
// ];
