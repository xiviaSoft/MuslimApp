import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { Flag, Report, Block } from "@mui/icons-material";
import { COLORS } from "@muc/constants";
import { useParams } from "react-router";
import { useState } from "react";
import ReportDialog from "../ReportDialog/ReportDialog";


const profileData = [
  { label: "My Sect", value: "Just Muslim" },
  { label: "Religiousness", value: "Religious" },
  { label: "My Profession", value: "Business" },
  { label: "Marital Status", value: "Divorced" },
  { label: "County/State", value: "Queensland, Gold Coast" },
  {
    label: "Country",
    value: (
      <>
        <Flag fontSize="small" /> Australia
      </>
    ),
  },
  {
    label: "Registration Reason",
    value: "I'm registering to find myself a partner",
  },
];





const UserProfileDetail = () => {
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const { id: otherUserId } = useParams()



  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ width: "100%", mt: 2, border: "1px solid #ddd" }}
      >
        <Table>
          <TableBody>
            {profileData.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    color: COLORS.primary.main,
                    fontSize: "14px",
                    padding: { md: '16px', xs: '10px' }
                  }}
                >
                  {item.label}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    alignItems: "center",
                    display: "flex",
                    gap: "2px",
                    padding: { md: '16px', xs: '10px' }
                  }}
                >
                  {item.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, p: 2 }}>
          <Button
            variant="text"
            startIcon={<Report />}
            sx={{ color: "gray" }}
            onClick={() => setOpenReportDialog(true)}
          >
            Report
          </Button>
          <Button variant="text" startIcon={<Block />} sx={{ color: "gray" }}>
            Block
          </Button>
        </Box>
      </TableContainer>
      <ReportDialog
        open={openReportDialog}
        onClose={() => setOpenReportDialog(false)}
        reportedUserId={otherUserId as string}

      />
    </>

  );
};

export default UserProfileDetail;
