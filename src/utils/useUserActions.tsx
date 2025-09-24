import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth, db } from "@muc/libs";
import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import { User } from "@muc/context";

const useUserActions = () => {
    const queryClient = useQueryClient();

    // ✅ Add visit
    const addVisit = useMutation({
        mutationFn: async (visitedUserId: string) => {
            if (!auth.currentUser?.uid || !visitedUserId) {
                throw new Error("User not authenticated or invalid visitedUserId");
            }
            const currentUserId = auth.currentUser.uid;

            await updateDoc(doc(db, "users", visitedUserId), {
                visits: arrayUnion(currentUserId),
            });

            return { visitedUserId, currentUserId };
        },
        onSuccess: ({ visitedUserId, currentUserId }) => {
            queryClient.setQueryData(["users"], (oldData: User[] | undefined) => {
                if (!oldData) return [];
                return oldData.map((user) => {
                    if (user.id === visitedUserId) {
                        if (!user.visits?.includes(currentUserId)) {
                            return { ...user, visits: [...(user.visits || []), currentUserId] };
                        }
                    }
                    return user;
                });
            });
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    // ✅ Like user
    const likeUser = useMutation({
        mutationFn: async (likedUserId: string) => {
            if (!auth.currentUser?.uid || !likedUserId) return;
            const currentUserId = auth.currentUser.uid;

            await updateDoc(doc(db, "users", likedUserId), {
                likes: arrayUnion(currentUserId),
            });

            await updateDoc(doc(db, "users", currentUserId), {
                liked: arrayUnion(likedUserId),
            });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });

    // ✅ Remove like
    const removeLike = useMutation({
        mutationFn: async (likedUserId: string) => {
            if (!auth.currentUser?.uid || !likedUserId) return;
            const currentUserId = auth.currentUser.uid;

            await updateDoc(doc(db, "users", likedUserId), {
                likes: arrayRemove(currentUserId),
            });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });

    return {
        addVisit,
        likeUser,
        removeLike,
    };
};

export default useUserActions