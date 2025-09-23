import { menuItemData } from "@muc/constants";
import { Stack, Typography } from "@mui/material";
import { CustomSelect } from "@muc/components";

export default function BasicSelect() {


  return (
    <Stack
      direction={"row"}
      sx={{ alignItems: "center", justifyContent: "center", gap: '16px' }}
    >
      <Typography sx={{ width: '80px', textAlign: 'end' }}>From :</Typography>
      {/* <FormControl >
        <Select
          value={data}
          onChange={handleChange}
          sx={{
            color: COLORS.dark.main,
            background: "linear-gradient(to bottom, #fff, #e6e6e6)",
            height: "36px",
            
          }}
        >
          {menuItemData.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <CustomSelect
        name="country"
        // label="country
        // k"
        options={menuItemData.map((item) => ({
          label: item,
          value: item,
        }))}
      />
    </Stack>
  );
}
