import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@muc/collections";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@muc/libs";

const cleanDeep = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(cleanDeep).filter((v) => v !== undefined);
    } else if (obj !== null && typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj)
                .map(([k, v]) => [k, cleanDeep(v)])
                .filter(([_, v]) => v !== undefined)
        );
    }
    return obj === undefined ? undefined : obj;
};

const useUpdateUser = (uid: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: Partial<User>) => {
            if (!uid) throw new Error("No UID provided");

            const userRef = doc(db, "users", uid);
            const cleaned = cleanDeep(updates);

            console.log("📌 Final cleaned Firestore data:", cleaned);

            await setDoc(
                userRef,
                {
                    ...cleaned,
                    updatedAt: serverTimestamp(),
                },
                { merge: true }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", uid] });
        },
    });
};

export default useUpdateUser;
