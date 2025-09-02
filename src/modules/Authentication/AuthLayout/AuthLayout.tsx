import { Box, Stack } from "@mui/material";
import { CustomSlider } from "@muc/components";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box sx={{ width: "100%", minHeight: "100vh" }}>
            <Box sx={{ position: "relative", height: "100%" }}>
                <CustomSlider />
                <Stack
                    direction="row"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        maxWidth: "1200px",
                        px: { xs: 2, sm: 4 },
                        height: '90vh',

                    }}
                >
                    {children}
                </Stack>
            </Box>
        </Box>
    );
};

export default AuthLayout;
