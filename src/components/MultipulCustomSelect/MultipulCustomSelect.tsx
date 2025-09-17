import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
    Box,
    Typography,
    MenuItem,
    Select,
    InputAdornment,
    Checkbox,
    ListItemText,
    Chip
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { COLORS } from "@muc/constants";

interface Option {
    value: string;
    label: string;
}

interface MultipulCustomSelectProps {
    name: string;
    label?: string;
    options: Option[];
    dependsOn?: string;
    width?: string;
    height?: string;
    iconColor?: string;
    labelOutside?: boolean;
    showSearchIcon?: boolean;
    onChange?: (value: string[]) => void; 
    disabled?: boolean;
}

const MultipulCustomSelect: React.FC<MultipulCustomSelectProps> = ({
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

    // ✅ state for read more toggle
    const [expanded, setExpanded] = useState(false);

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
                defaultValue={[]} // ✅ array for multiple
                rules={{ required: `${label || "This field"} is required` }}
                render={({ field, fieldState }) => (
                    <>
                        <Select
                            {...field}
                            multiple
                            value={field.value || []}
                            displayEmpty
                            onChange={(e) => {
                                const value =
                                    typeof e.target.value === "string"
                                        ? e.target.value.split(",")
                                        : e.target.value;
                                field.onChange(value);
                                onChange?.(value);
                            }}
                            disabled={disabled}
                            error={!!fieldState.error}
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
                            renderValue={(selected) => {
                                if (!selected || selected.length === 0) {
                                    return (
                                        <em style={{ fontSize: "14px", color: "gray" }}>
                                            Select any
                                        </em>
                                    );
                                }

                                const maxToShow = 3;
                                const showAll = expanded || (selected as string[]).length <= maxToShow;
                                const visible = showAll
                                    ? (selected as string[])
                                    : (selected as string[]).slice(0, maxToShow);

                                return (
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                        {visible.map((value) => {
                                            const option = options.find((opt) => opt.value === value);
                                            return (
                                                <Chip
                                                    key={value}
                                                    label={option?.label || value}
                                                    sx={{
                                                        bgcolor: COLORS.primary.main,
                                                        color: COLORS.white.main,
                                                        fontSize: "12px",
                                                    }}
                                                />
                                            );
                                        })}

                                        {(selected as string[]).length > maxToShow && (
                                            <Chip
                                                label={
                                                    expanded
                                                        ? "Show Less"
                                                        : `+${(selected as string[]).length - maxToShow} more`
                                                }
                                                sx={{
                                                    bgcolor: COLORS.gray.lightDarkGray,
                                                    color: COLORS.dark.lightblack,
                                                    fontSize: "12px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // ✅ avoid opening dropdown
                                                    setExpanded(!expanded);
                                                }}
                                            />
                                        )}
                                    </Box>
                                );
                            }}
                            sx={{
                                width: width || "100%",
                                borderRadius: "16px",
                                backgroundColor: COLORS.gray.lightDarkGray,
                                minHeight: height || "56px",
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
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <Checkbox
                                        checked={field.value?.includes(option.value)}
                                        sx={{ p: 0.5 }}
                                    />
                                    <ListItemText primary={option.label} />
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

export default MultipulCustomSelect;
