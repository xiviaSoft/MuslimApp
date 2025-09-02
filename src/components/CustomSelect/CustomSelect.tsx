import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  InputAdornment
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { COLORS } from "@muc/constants";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  name: string;
  label?: string;
  options: Option[];
  dependsOn?: string;
  width?: string;
  height?: string;
  iconColor?: string;
  labelOutside?: boolean;
  showSearchIcon?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  label,
  options,
  dependsOn,
  width,
  height,
  iconColor = COLORS.blue.main,
  showSearchIcon = false,
  onChange,
  disabled: disabledProp = false,
}) => {
  const { control, watch } = useFormContext();
  const dependencyValue = dependsOn ? watch(dependsOn) : null;
  const [disabled, setDisabled] = useState(disabledProp || !!dependsOn);

  useEffect(() => {
    if (dependsOn && dependencyValue) {
      setDisabled(false);
    }
  }, [dependsOn, dependencyValue]);

  return (
    <Box width={{ md: width, sm: width, xs: "100%" }}>
      {label && (
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            color: COLORS.dark.lightblack,
            my: 1
          }}
        >
          {label}
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue="" // ✅ ensures controlled
        rules={{ required: `${label || "This field"} is required` }}
        render={({ field, fieldState }) => (
          <>
            <Select
              {...field}
              value={field.value || ""} // ✅ never undefined
              displayEmpty
              onChange={(e) => {
                field.onChange(e.target.value);
                onChange?.(e.target.value);
              }}
              disabled={disabled}
              error={!!fieldState.error} // ✅ red border on error
              IconComponent={(props) => (
                <Box
                  component="svg"
                  {...props}
                  viewBox="0 0 24 24"
                  width="24px"
                  mt={-0.5}
                >
                  <path
                    d="M7 10l5 5 5-5"
                    fill="none"
                    stroke={iconColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Box>
              )}
              renderValue={(selected) =>
                !selected ? (
                  <em style={{ fontSize: "14px", color: "gray" }}>
                    Select any
                  </em>
                ) : (
                  options.find((opt) => opt.value === selected)?.label
                )
              }
              sx={{
                width: width || "100%",
                borderRadius: "50px",
                backgroundColor: COLORS.gray.lightDarkGray,
                height: height || "56px",
                "& fieldset": { border: "none" },
                px: 1,
              }}
              startAdornment={
                showSearchIcon && (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "gray" }} />
                  </InputAdornment>
                )
              }
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 300,
                    borderRadius: "20px",
                    overflowY: "auto",
                    "&::-webkit-scrollbar": { width: 0 },
                  },
                },
              }}
            >
              {/* ✅ Placeholder option */}
              <MenuItem value="">
                <em style={{ fontSize: "14px", color: "gray" }}>Select any</em>
              </MenuItem>

              {options.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{
                    mt: 1,
                    py: "10px",
                    borderBottom: `1px solid ${COLORS.gray.whiteGray}`,
                    "&:last-of-type": { border: "none" },
                    "&:hover": { bgcolor: COLORS.gray.whiteGray },
                    "&.Mui-selected": {
                      bgcolor: COLORS.primary.main,
                      color: COLORS.white.main,
                      "&:hover": {
                        bgcolor: COLORS.gray.whiteGray,
                        color: COLORS.dark.main,
                      },
                    },
                    fontSize: "13px",
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}

              {options.length === 0 && (
                <MenuItem disabled>
                  <Typography variant="body2" color="text.secondary">
                    No options found
                  </Typography>
                </MenuItem>
              )}
            </Select>

            {/* ✅ Show error message */}
            {fieldState.error && (
              <Typography sx={{ fontSize: "12px", color: "red", mt: 0.5 }}>
                {fieldState.error.message}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default CustomSelect;
