

import React, { useCallback } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

import {
    Box,
    TextField,
    Typography,
} from "@mui/material";
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
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
    name,
    type,
    rules,
    label,
    width,
    height,
    onBlur,
    minRows,
    maxRows,
    onFocus,
    disabled,
    multiline,
    maxLength,
    allowOnly,
    description,
    placeholder,
    defaultValue,
    autoComplete,
    readOnly = false,
    showHelperText = true,
    endAdornment,
    ...props
}) => {
    const { control, } = useFormContext();



    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
    }, [allowOnly, maxLength]);

    // Label
    // const renderLabel = () => (
    //     <Stack direction="column" gap={"4px"}>
    //         {/* <Typography
    //             // variant="h2_bold"
    //             component={InputLabel}
    //             sx={{ color: COLORS.gray.dark }}
    //         >
    //             {label}
    //         </Typography> */}
    //         <Typography
    //             // variant="h6_light"
    //             mb={1}
    //         >
    //             {description}
    //         </Typography>
    //     </Stack>
    // );

    // Helper Text
    const renderHelperText = (errorMessage?: string) => {
        if (!showHelperText || !errorMessage) return "";

        return (
            <Typography
                component="span"
                variant="caption"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    color: COLORS.red.main,
                    marginLeft: -2,
                    textTransform: "none",
                }}
            >

                {errorMessage}
            </Typography>
        );
    };


    // Password Adornment


    // TextField
    return (
        <Box width={{ md: width, sm: width, xs: "100%" }}>
            {/* {renderLabel()} */}
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
                        defaultValue={defaultValue || ""}
                        fullWidth
                        label={label}
                        multiline={multiline}
                        minRows={minRows}
                        maxRows={maxRows}
                        error={!!fieldState.error}

                        sx={{
                            bgcolor:COLORS.white.darkwhite,
                            "& .MuiInputBase-root": {
                                height: height || "inherit",
                                padding: 0
                            },
                        }}
                        helperText={renderHelperText(fieldState.error?.message?.toString())}


                        inputProps={{
                            maxLength,
                            onInput: handleInputChange,
                        }}
                        InputProps={{
                            endAdornment: endAdornment ? endAdornment : <div />,
                            readOnly,
                            autoComplete,
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
