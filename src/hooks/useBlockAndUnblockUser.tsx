
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth, db } from "@muc/libs";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const useBlockAndUnblockUser = (otherUserId: string) => {
    const currentUserId = auth.currentUser?.uid;
    const queryClient = useQueryClient();

    const blockMutation = useMutation({
        mutationFn: async () => {
            if (!currentUserId) return;
            await updateDoc(doc(db, "users", currentUserId), {
                blocked: arrayUnion(otherUserId),
            });
        },
        onSuccess: (_, otherUserId) => {
            queryClient.invalidateQueries({ queryKey: ["blockedUsers", currentUserId] });
            queryClient.invalidateQueries({ queryKey: ["blockedStatus", currentUserId, otherUserId] });
        },
    });

    const unblockMutation = useMutation({
        mutationFn: async () => {
            if (!currentUserId) return;
            await updateDoc(doc(db, "users", currentUserId), {
                blocked: arrayRemove(otherUserId),
            });
        },
        onSuccess: (_, otherUserId) => {
            queryClient.invalidateQueries({ queryKey: ["blockedUsers", currentUserId] });
            queryClient.invalidateQueries({ queryKey: ["blockedStatus", currentUserId, otherUserId] });
        },
    });

    return { blockMutation, unblockMutation }; // ✅ return both
};


export default useBlockAndUnblockUser
