import { Box, Stack } from "@mui/material";

import { CustomSlider } from "@muc/components";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box>
            <Box sx={{ position: "relative" }}>
                <CustomSlider />
                <Stack
                    direction={"row"}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {children}
                </Stack>
            </Box>
        </Box>
    );
};




export default AuthLayout
