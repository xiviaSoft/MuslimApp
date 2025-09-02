import React, { useCallback } from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import {
    Box,
    TextField,
    InputAdornment,
    Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { COLORS } from "@muc/constants";


interface CustomTextFieldProps {
    name: string;
    label?: string;
    type: string;
    width?: string;
    height?: string;
    multiline?: any;
    minRows?: number;
    maxRows?: number;
    readOnly?: boolean;
    maxLength?: number;
    disabled?: boolean;
    placeholder?: string;
    description?: string;
    autoComplete?: string;
    defaultValue?: string;
    rules?: RegisterOptions;
    showHelperText?: boolean;
    allowOnly?: "numeric" | "alphabetic" | "alphanumeric" | "decimal";
    onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void;
    endAdornment?: React.ReactNode;
    showSearchIcon?: boolean; // <-- added new prop
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
    name,
    type,
    rules,
    width,
    label,
    height,
    onBlur,
    minRows,
    maxRows,
    onFocus,
    disabled,
    multiline,
    maxLength,
    allowOnly,
    placeholder,
    defaultValue,
    autoComplete,
    readOnly = false,
    showHelperText = true,
    endAdornment,
    showSearchIcon = false, // <-- default false
    ...props
}) => {
    const { control } = useFormContext();

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const patterns = {
                numeric: /[^0-9]/g,
                decimal: /[^0-9.]/g,
                alphabetic: /[^a-zA-Z]/g,
                alphanumeric: /[^a-zA-Z0-9]/g,
            };

            if (allowOnly && patterns[allowOnly]) {
                e.target.value = value.replace(patterns[allowOnly], "");
            }

            if (maxLength && e.target.value.length > maxLength) {
                e.target.value = e.target.value.slice(0, maxLength);
            }
        },
        [allowOnly, maxLength]
    );

    return (
        <Box width={{ md: width, sm: width, xs: "100%" }}>
            {label && (<Typography sx={{ fontSize: '12px', fontWeight: 700, color: COLORS.dark.lightblack, m: '8px' }}>
                {label}
            </Typography>)}
            <Controller
                name={name}
                defaultValue={defaultValue}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <TextField
                        variant="outlined"
                        disabled={disabled}
                        {...field}
                        placeholder={placeholder || ""}
                        {...props}
                        multiline={multiline}
                        fullWidth
                        minRows={minRows}
                        maxRows={maxRows}
                        error={!!fieldState.error}
                        type={type}
                        autoComplete={autoComplete}
                        InputProps={{
                            startAdornment: showSearchIcon && ( // <-- conditionally render
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "gray" }} />
                                </InputAdornment>
                            ),
                            endAdornment: endAdornment,
                            sx: {
                                // width: width || "285px",
                                borderRadius: "50px",
                                backgroundColor: COLORS.gray.lightDarkGray,
                                border: "none",
                                height: multiline ? "auto" : height || "56px",
                                paddingRight: "8px",
                                "& fieldset": { border: "none" },
                            },
                        }}
                        inputProps={{
                            maxLength,
                            onInput: handleInputChange,
                            readOnly,
                        }}
                        onBlur={(event) => {
                            field.onBlur();
                            onBlur?.(event);
                        }}
                        onFocus={onFocus}
                    />
                )}
            />
        </Box>
    );
};

export default CustomTextField;
