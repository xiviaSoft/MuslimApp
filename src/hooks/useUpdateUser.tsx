import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@muc/libs";
import { User } from "@muc/collections";

const useUpdateUser = (uid: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: Partial<User>) => {
            const userRef = doc(db, "users", uid);
            await setDoc(
                userRef,
                { ...updates, updatedAt: serverTimestamp() },
                { merge: true }
            );
            return updates;
        },
        onSuccess: (updates) => {
      
            queryClient.setQueryData<User | null>(["user", uid], (oldUser) =>
                oldUser ? { ...oldUser, ...updates } : oldUser
            );
        },
    });
};

export default useUpdateUser;