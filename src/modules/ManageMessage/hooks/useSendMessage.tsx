import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  // collection,
  // query,
  // where,
  // getDocs,
} from "firebase/firestore";
import { db } from "@muc/libs";
import { dmDoc, messagesCol, threadIdFor } from "@muc/utils";

interface SendMessageArgs {
  meUid: string;
  otherUid: string;
  text: string;
}

const sendMessageFn = async ({ meUid, otherUid, text }: SendMessageArgs) => {
  const tid = threadIdFor(meUid, otherUid);

  // Count all messages sent by this user, including deleted
  // const messagesQuery = query(
  //   collection(db, "dms", tid, "messages"),
  //   where("senderId", "==", meUid),
  // );
  // const messagesSnapshot = await getDocs(messagesQuery);
  // const totalMessages = messagesSnapshot.docs.length;

  // Ensure thread exists
  await setDoc(
    dmDoc(db, tid),
    {
      participants: [meUid, otherUid],
      createdAt: serverTimestamp(),
      lastMessageText: text,
      lastMessageSenderId: meUid,
      lastMessageAt: serverTimestamp(),
    },
    { merge: true },
  );

  // Add message
  await addDoc(messagesCol(db, tid), {
    senderId: meUid,
    text,
    sentAt: serverTimestamp(),
  });

  // Update thread preview
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
      // Refresh chat list/messages
      queryClient.invalidateQueries({
        queryKey: ["chatList", variables.meUid],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "messages",
          threadIdFor(variables.meUid, variables.otherUid),
        ],
      });
    },
  });
};
