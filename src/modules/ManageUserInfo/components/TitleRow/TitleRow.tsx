import { COLORS } from "@muc/constants";
import { Stack, Typography } from "@mui/material";

const TitleRow = ({ value, label }: { value: any; label: string }) => {
    const formatValue = (val: any) => {
        if (!val) return "N/A";

        if (val?.seconds) {
            return new Date(val.seconds * 1000).toLocaleDateString();
        }

        if (val instanceof Date) {
            return val.toLocaleDateString();
        }


        if (typeof val === "object") {
            return JSON.stringify(val);
        }

        return String(val);
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            pb="10px"
        >
            <Typography
                color={COLORS.primary.main}
                sx={{ width: "45%", textTransform: "capitalize" }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    width: "55%",
                    color: COLORS.dark.main,
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                }}
            >
                {formatValue(value)}
            </Typography>
        </Stack>

    );
};


export default TitleRow
