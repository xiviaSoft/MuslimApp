import { COLORS } from "@muc/constants";
import { createTheme } from "@mui/material";

export let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    h1: {
      fontWeight: 600,
      fontSize: "30px",
      lineHeight: "42px",
    },
    h2: {
      fontWeight: 600,
      fontSize: "24px",
      lineHeight: "30px",
      letterSpacing: "0.0015em",
      textAlign: "left",
    },
    h3: {
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: "28px",
      letterSpacing: "0.0015em",
    },
    h4: {
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "21px",
    },
    h5: {
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "29px",
    },
    h6: {
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: "23px",
    },
    body1: {
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "20px",
    },
    body2: {
      fontWeight: 300,
      fontSize: "12px",
      lineHeight: "18px",
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 10,
          color: "rgba(11,173,11,.17)",
        },
        thumb: {
          height: 18,
          width: 18,
          backgroundColor: COLORS.green.main,
          border: "2px solid currentColor",
          "&:hover": {
            boxShadow: "0 0 0 8px rgba(76, 175, 80, 0.16)",
          },
        },
        track: {
          height: 10,
        },
        rail: {
          height: 10,
          opacity: 0.5,
          backgroundColor: COLORS.white.grayWhite,
          border: `1px solid ${COLORS.gray.lightGray}`,
        },
      },
    },
    // MuiSwitch: {
    //   styleOverrides: {
    //     root: {
    //       width: 80,
    //       height: 25,
    //       padding: 0,
    //     },
    //     switchBase: {
    //       padding: 2,
    //       "&.Mui-checked": {
    //         transform: "translateX(55px)",
    //         color: "white",
    //         "& + .MuiSwitch-track": {
    //           backgroundColor: "green",

    //           "&:before": {
    //             content: '"Live"',
    //             position: "absolute",
    //             width: "100%",
    //             height: "100%",
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             fontSize: "12px",
    //             color: "white",
    //           },
    //         },
    //       },
    //     },
    //     thumb: {
    //       width: 20,
    //       height: 20,
    //     },
    //     track: {
    //       backgroundColor: COLORS.red.main,
    //       borderRadius: 30,
    //       position: "relative",
    //       opacity: 1,
    //       "&:before": {
    //         content: '"Hidden"',
    //         position: "absolute",
    //         width: "100%",
    //         height: "100%",
    //         display: "flex",
    //         justifyContent: "end",
    //         alignItems: "center",
    //         fontSize: "12px",
    //         color: "white",
    //       },
    //     },
    //   },
    // },

    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          fontWeight: 400,
          borderRadius: "4px",
          // padding: "10px",
          textTransform: "none",
          height: "auto",
          whiteSpace: "nowrap",
          [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
            height: "35px",
            width: "auto",
          },
        },
        contained: {
          backgroundColor: COLORS.primary.main,
          boxShadow: "none",
          height: "56px",
          color: COLORS.white.main,
          "&:hover": {
            backgroundColor: COLORS,
            boxShadow: "none",
          },
          "&.Mui-disabled": {
            backgroundColor: COLORS,

            color: "white",
            opacity: 0.6,
          },
        },
        outlined: {
          border: `1px solid ${COLORS.gray.main}`,
          color: COLORS.dark.main,
          backgroundColor: "transparent",
          boxShadow: "none",
          height: "56px",
          minHeight: "34px",
          padding: 0,
          "&:hover": {
            border: `1px solid ${COLORS.gray.main}`,
            backgroundColor: `transparent`,
            boxShadow: "none",
          },
          "& .MuiOutlinedInput-root": {
            Padding: 0,
          },
          "&.Mui-disabled": {
            borderColor: COLORS.gray.main,
            color: "black",
            opacity: 0.6,
            backgroundColor: "transparent",
          },
        },
      },

      defaultProps: {
        disableRipple: false,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: "none",
          color: COLORS.dark.lightblack,
        },
      },
    },

    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: 8,
    //       // height: 44,
    //       border: `1px solid ${COLORS.gray.lightGray}`,
    //       color: COLORS.white.main,
    //       background: "transparent",
    //       "& fieldset": {
    //         padding: "12px 16px",
    //       },
    //       "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //         border: `transparent`,
    //       },
    //       "&.Mui-focused fieldset": {
    //         border: `transparent`,
    //       },
    //       "& input::placeholder": {
    //         color: COLORS.gray.lightGray,
    //         opacity: 0.4,
    //       },
    //       "& input:-webkit-autofill": {
    //         WebkitBoxShadow: "0 0 0 100px transparent inset",
    //         transition: "background-color 5000s ease-in-out 0s",
    //       },
    //       "& input:-webkit-autofill:focus": {
    //         WebkitBoxShadow: "0 0 0 100px transparent inset",
    //         borderColor: COLORS.primary.main,
    //       },
    //       "& input:hover": {
    //         border: `transparent`,
    //       },
    //       "& input:focus": {
    //         border: `transparent`,
    //       },
    //     },
    //   },
    // },
  },
};
