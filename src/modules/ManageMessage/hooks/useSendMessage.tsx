// hooks/useSendMessage.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@muc/libs";
import { dmDoc, messagesCol, threadIdFor } from "@muc/collections";

interface SendMessageArgs {
    meUid: string;
    otherUid: string;
    text: string;
}

const sendMessageFn = async ({ meUid, otherUid, text }: SendMessageArgs) => {
    const tid = threadIdFor(meUid, otherUid);

    // 1️⃣ Ensure thread exists
    await setDoc(
        dmDoc(db, tid),
        {
            participants: [meUid, otherUid].sort(),
            createdAt: serverTimestamp(),
            lastMessageText: text,
            lastMessageSenderId: meUid,
            lastMessageAt: serverTimestamp(),
        },
        { merge: true }
    );

    // 2️⃣ Add message
    await addDoc(messagesCol(db, tid), {
        senderId: meUid,
        text,
        sentAt: serverTimestamp(),
    });

    // 3️⃣ Update preview
    await updateDoc(dmDoc(db, tid), {
        lastMessageText: text,
        lastMessageSenderId: meUid,
        lastMessageAt: serverTimestamp(),
    });
};

export const useSendMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sendMessageFn,
        onSuccess: (_, variables) => {
            // 🔄 Invalidate queries so chat list/messages refresh
            queryClient.invalidateQueries({
                queryKey: ["chatList", variables.meUid],
            });
            queryClient.invalidateQueries({
                queryKey: ["messages", threadIdFor(variables.meUid, variables.otherUid)],
            });
        },
    });
};
