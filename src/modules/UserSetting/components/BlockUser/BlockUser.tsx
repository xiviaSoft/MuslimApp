import { COLORS, ROUTES } from "@muc/constants";
import {
  Stack,
  Typography,
  Divider,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { CustomButton } from "@muc/components";
import { useUsers } from "@muc/context";
import { auth, db } from "@muc/libs";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const BlockUser = () => {
  const currentUserId = auth.currentUser?.uid;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { myBlocked } = useUsers();

  // ✅ Fetch full user details for blocked users
  const { data: blockedUsers, isLoading } = useQuery({
    queryKey: ["blockedUsers", currentUserId, myBlocked],
    queryFn: async () => {
      if (!currentUserId || myBlocked.length === 0) return [];
      const q = query(
        collection(db, "users"),
        where("__name__", "in", myBlocked),
      );
      const snap = await getDocs(q);
      return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    enabled: !!currentUserId && myBlocked.length > 0,
  });

  const unblockUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      if (!currentUserId) return;
      await updateDoc(doc(db, "users", currentUserId), {
        blocked: arrayRemove(userId),
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["blockedUsers", currentUserId, myBlocked],
      }),
  });

  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "100vh",
        p: 2,
        bgcolor: COLORS.gray.whiteGray,
      }}
    >
      <Typography
        variant="h6"
        fontSize={24}
        color={COLORS.gray.darkGray}
        mb={2}
      >
        Blocked Users
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {isLoading ? (
        <Stack width="100%" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      ) : blockedUsers && blockedUsers.length > 0 ? (
        blockedUsers.map((user: any) => (
          <Paper
            key={user.id}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              mb: 2,
            }}
          >
            <Stack direction="row" alignItems="center" gap={2}>
              <Avatar src={user.photoURL} alt={user.firstName} />
              <Typography
                onClick={() => navigate(`/${ROUTES.USER_INFO}/${user.id}`)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                    color: "primary.main",
                  },
                }}
              >
                {user.firstName} {user.lastName}
              </Typography>
            </Stack>
            <CustomButton
              title={
                unblockUserMutation.isPending ? "Unblocking..." : "Unblock"
              }
              variant="outlined"
              color={COLORS.red.main}
              isLoading={unblockUserMutation.isPending}
              onClick={() => unblockUserMutation.mutate(user.id)}
              height="32px"
              width="100px"
            />
          </Paper>
        ))
      ) : (
        <Typography textAlign="center">You have no blocked users.</Typography>
      )}
    </Stack>
  );
};

export default BlockUser;
