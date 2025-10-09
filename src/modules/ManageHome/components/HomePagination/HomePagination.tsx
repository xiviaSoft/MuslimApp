import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { styled } from "@mui/material/styles";
import { COLORS } from "@muc/constants";
interface HomePaginationProps {
  page: number;
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}


const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    borderRadius: 4,
    fontWeight: 500,
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: COLORS.primary.main,
      color: theme.palette.primary.contrastText,
    },
    "&.Mui-selected": {
      backgroundColor: COLORS.primary.main,
      color: theme.palette.common.white,

    },
  },
}));

const HomePagination = ({ page, count, onChange }: HomePaginationProps) => {

  return (
    <Stack spacing={2} alignItems="center" mt={4}>
      <Typography variant="h6" color="text.secondary">

      </Typography>
      <StyledPagination count={count} page={page} onChange={onChange} />
    </Stack>
  );
};

export default HomePagination;






