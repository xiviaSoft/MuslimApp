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

import {
  arrayUnion,
  arrayRemove,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@muc/libs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  const { id: otherUserId } = useParams();
  const currentUserId = auth.currentUser?.uid;
  const queryClient = useQueryClient();

  // ✅ Dialog state
  const [openReportDialog, setOpenReportDialog] = useState(false);

  const { data: isBlocked, isLoading } = useQuery({
    queryKey: ["blockedStatus", currentUserId, otherUserId],
    queryFn: async () => {
      if (!currentUserId || !otherUserId) return false;
      const userDoc = await getDoc(doc(db, "users", currentUserId));
      if (!userDoc.exists()) return false;
      const blocked = userDoc.data().blocked || [];
      return blocked.includes(otherUserId);
    },
    enabled: !!currentUserId && !!otherUserId,
  });

  const blockMutation = useMutation({
    mutationFn: async () => {
      if (!currentUserId || !otherUserId) return;
      await updateDoc(doc(db, "users", currentUserId), {
        blocked: arrayUnion(otherUserId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blockedStatus", currentUserId, otherUserId],
      });
    },
  });

  const unblockMutation = useMutation({
    mutationFn: async () => {
      if (!currentUserId || !otherUserId) return;
      await updateDoc(doc(db, "users", currentUserId), {
        blocked: arrayRemove(otherUserId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blockedStatus", currentUserId, otherUserId],
      });
    },
  });

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
                    padding: { md: "16px", xs: "10px" },
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
                    padding: { md: "16px", xs: "10px" },
                  }}
                >
                  {item.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            p: 2,
          }}
        >
          {/* ✅ Report Button Opens Dialog */}
          <Button
            variant="text"
            startIcon={<Report />}
            sx={{ color: "gray" }}
            onClick={() => setOpenReportDialog(true)}
          >
            Report
          </Button>

          {isLoading ? (
            <Button variant="text" disabled>
              Loading...
            </Button>
          ) : isBlocked ? (
            <Button
              variant="text"
              onClick={() => unblockMutation.mutate()}
              startIcon={<Block />}
              sx={{ color: "red" }}
              disabled={unblockMutation.isPending}
            >
              Unblock
            </Button>
          ) : (
            <Button
              variant="text"
              onClick={() => blockMutation.mutate()}
              startIcon={<Block />}
              sx={{ color: "gray" }}
              disabled={blockMutation.isPending}
            >
              Block
            </Button>
          )}
        </Box>
      </TableContainer>

      {/* ✅ Report Dialog Box */}
      <ReportDialog
        open={openReportDialog}
        onClose={() => setOpenReportDialog(false)}
        reportedUserId={otherUserId || ""}
      />
    </>
  );
};

export default UserProfileDetail;
