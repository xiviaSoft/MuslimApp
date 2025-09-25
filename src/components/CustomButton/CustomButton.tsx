import { COLORS } from "@muc/constants";
import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";

interface ButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  width?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant?: "contained" | "outlined";
  height?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  background?: string;
  color?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  type = "button",
  width,
  onClick,
  disabled,
  variant = "contained",
  height,
  icon,
  endIcon,
  background,
  color,
  isLoading = false,
}) => {
  return (
    <Box width={width}>
      <Button
        type={type}
        variant={variant}
        onClick={onClick}
        disabled={disabled || isLoading}
        startIcon={icon}
        endIcon={endIcon}
        sx={{
          borderRadius: "10px",
          fontWeight: 600,
          textTransform: "none",
          fontSize: "15px",
          px: 3,
          py: 1.5,
          height: height || "44px",
          width: {
            md: width || "auto",
            sm: width || "auto",
            xs: width || "100%",
          },
          color: color || (variant === "contained" ? COLORS.white.main : COLORS.primary.main),
          backgroundColor:
            variant === "contained"
              ? background || COLORS.primary.main
              : "transparent",
          border:
            variant === "outlined"
              ? `1.5px solid ${COLORS.primary.main}`
              : "none",
          boxShadow: variant === "contained" ? "0 3px 6px rgba(0,0,0,0.15)" : "none",
          "&:hover": {
            backgroundColor:
              variant === "contained"
                ? background || COLORS.primary.main
                : "rgba(0,0,0,0.05)",
            boxShadow:
              variant === "contained" ? "0 4px 10px rgba(0,0,0,0.2)" : "none",
          },
          "&:disabled": {
            backgroundColor: "#e0e0e0",
            color: "#9e9e9e",
            border: "none",
            boxShadow: "none",
          },
        }}
      >
        {isLoading ? (
          <CircularProgress
            size={22}
            sx={{
              color:
                variant === "outlined" ? COLORS.primary.main : COLORS.white.main,
            }}
          />
        ) : (
          title
        )}
      </Button>
    </Box>
  );
};

export default CustomButton;
