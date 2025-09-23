import { COLORS } from "@muc/constants";
import {
  Divider,
  Stack,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Button,
} from "@mui/material";
import { auth, db } from "@muc/libs";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BlockUser = () => {
  const currentUserId = auth.currentUser?.uid;
  const queryClient = useQueryClient();

  // ✅ Fetch blocked users
  const { data: blockedUsers, isLoading } = useQuery({
    queryKey: ["blockedUsers", currentUserId],
    queryFn: async () => {
      if (!currentUserId) return [];
      const userDoc = await getDoc(doc(db, "users", currentUserId));
      if (!userDoc.exists()) return [];

      const blockedIds: string[] = userDoc.data().blocked || [];
      if (blockedIds.length === 0) return [];

      const q = query(collection(db, "users"), where("__name__", "in", blockedIds));
      const snap = await getDocs(q);

      return snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    enabled: !!currentUserId,
  });

  // ✅ Block user mutation
  const blockUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      if (!currentUserId) return;
      await updateDoc(doc(db, "users", currentUserId), {
        blocked: arrayUnion(userId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blockedUsers", currentUserId] });
    },
  });

  // ✅ Unblock user mutation
  const unblockUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      if (!currentUserId) return;
      await updateDoc(doc(db, "users", currentUserId), {
        blocked: arrayRemove(userId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blockedUsers", currentUserId] });
    },
  });

  return (
    <Stack>
      <Typography
        variant="h6"
        fontSize={"24px"}
        color={COLORS.gray.darkGray}
        mb={"21px"}
      >
        Blocked Users
      </Typography>
      <Divider />

      <Stack
        sx={{
          width: "100%",
          bgcolor: COLORS.gray.whiteGray,
          minHeight: "100vh",
          p: 2,
        }}
        justifyContent={isLoading ? "center" : "flex-start"}
        alignItems="center"
      >
        {isLoading ? (
          <CircularProgress />
        ) : blockedUsers && blockedUsers.length > 0 ? (
          blockedUsers.map((user: any) => (
            <Paper
              key={user.id}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                mb: 2,
                gap: 2,
              }}
            >
              <Stack direction="row" alignItems="center" gap={2}>
                <Avatar src={user.photoURL} alt={user.firstName} />
                <Typography>
                  {user.firstName} {user.lastName}
                </Typography>
              </Stack>

              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => unblockUserMutation.mutate(user.id)}
                disabled={unblockUserMutation.isPending}
              >
                {unblockUserMutation.isPending ? "Unblocking..." : "Unblock"}
              </Button>
            </Paper>
          ))
        ) : (
          <Typography textAlign="center">You have no blocked users.</Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default BlockUser;
