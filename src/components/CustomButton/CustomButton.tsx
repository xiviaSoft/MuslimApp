import { COLORS } from "@muc/constants";
import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";

interface ButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  width?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant: "contained" | "outlined";
  height?: string;
  isLoading?: boolean;
  icon?: any;
  endIcon?: any;
  background?: string;
  color?: string;
}

const CustomButton: React.FC<ButtonProps> = (props) => {
  const {
    title,
    type,
    width,
    onClick,
    disabled,
    variant,
    height,
    icon,
    endIcon,
    background,
    color,
    isLoading = false,
  } = props || {};
  return (
    <Box width={width}>
      <Button
        type={type ? type : "button"}
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        startIcon={icon}
        endIcon={endIcon}
        
        sx={{
          boxShadow:
            "inset 0 2px 4px rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.05)",
          border: `1px solid ${COLORS.gray.lightDarkGray}`,
          background: background
            ? background
            : " linear-gradient(to bottom, #fff, #e6e6e6)",
          padding: "30px",
          color: color ? color : "black",
          width: {
            md: width ? width : "auto",
            sm: width ? width : "auto",
            xs: width ? width : "100%",
            // xs: width ,
          },
          height: {
            md: height ? height : "inherit",
            sm: height ? height : "inherit",
          },
          // textTransform: "none",
          // "&:hover": {
          //   bgcolor: variant === "outlined" ? "transparent" : COLORS.white.main,
          //   boxShadow: "none",
          // },
     
        }}
      >
        {isLoading ? (
          <CircularProgress
            sx={{
              color:
                variant === "outlined"
                  ? COLORS.primary.main
                  : COLORS.white.main,
            }}
            size={25}
          />
        ) : (
          <>{title}</>
        )}
      </Button>
    </Box>
  );
};

export default CustomButton;
