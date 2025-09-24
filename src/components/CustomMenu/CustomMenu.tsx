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
      <CustomSelect
        name="country"
        isRequired={false}
        options={menuItemData.map((item) => ({
          label: item,
          value: item,
        }))}
      />
    </Stack>
  );
}
