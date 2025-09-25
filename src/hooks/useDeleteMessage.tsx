import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    deleteDoc,
    doc,
    collection,
    getDocs,
    orderBy,
    query,
    limit,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { db, auth } from "@muc/libs";

const useDeleteMessage = (threadId: string) => {
    const queryClient = useQueryClient();
    const currentUserId = auth.currentUser?.uid;

    return useMutation({
        mutationFn: async (msgId: string) => {
            if (!currentUserId) throw new Error("No current user");


            await deleteDoc(doc(db, "dms", threadId, "messages", msgId));

            // 2. Get latest message after deletion
            const q = query(
                collection(db, "dms", threadId, "messages"),
                orderBy("createdAt", "desc"),
                limit(1)
            );
            const snapshot = await getDocs(q);
            console.log(snapshot.docs, 'this is snapshot')
            if (!snapshot.empty) {
                const lastMsg = snapshot.docs[0].data();
                await updateDoc(doc(db, "dms", threadId), {
                    lastMessageText: lastMsg.text,
                    lastMessageSenderId: lastMsg.senderId || "",
                    lastMessageAt: lastMsg.createdAt || null,
                    [`lastReadAt.${currentUserId}`]: serverTimestamp(),
                });
            } else {
                await updateDoc(doc(db, "dms", threadId), {
                    lastMessageText: "",
                    lastMessageSenderId: "",
                    lastMessageAt: null,
                    [`lastReadAt.${currentUserId}`]: serverTimestamp(),
                });
            }

            return msgId;
        },

        onSuccess: (msgId) => {
            // Optimistically update cache for UI snappiness
            queryClient.setQueryData(["messages", threadId], (old: any) => {

                if (!old) return old;
                return old.filter((m: any) => m.id !== msgId);
            });

            // Also update thread cache if you're caching threads
            queryClient.invalidateQueries({ queryKey: ["threads"] });

        },
    });
};

export default useDeleteMessage