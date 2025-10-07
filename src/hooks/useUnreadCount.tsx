import { db } from "@muc/libs";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  FirestoreError,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export type ChatSummary = {
  id: string;
  otherUid?: string | null;
  otherUser?: any | null;
  unread: number;
  lastMessageText?: string;
  lastMessageAt?: any;
  lastReadAt?: any;
};

const useUnreadCount = (myUid?: string | null) => {
  const [total, setTotal] = useState(0);
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!myUid) return;

    const q = query(
      collection(db, "dms"),
      where("participants", "array-contains", myUid)
    );

    // keep all unsubscribers for messages
    const unsubMessages: (() => void)[] = [];

    const unsubThreads = onSnapshot(
      q,
      async (threadsSnap) => {
        // clear previous state before refilling
        setChats([]);

        // cleanup old message listeners
        unsubMessages.forEach((fn) => fn());
        unsubMessages.length = 0;

        await Promise.all(
          threadsSnap.docs.map(async (threadDoc) => {
            const threadData = threadDoc.data();
            const threadId = threadDoc.id;

            const otherUid =
              threadData.participants.find((uid: string) => uid !== myUid) ??
              null;

            let otherUser = null;
            if (otherUid) {
              const userDoc = await getDoc(doc(db, "users", otherUid));
              if (userDoc.exists()) {
                otherUser = { id: userDoc.id, ...userDoc.data() };
              }
            }

            const lastReadAt = threadData.lastReadAt?.[myUid];

            // Watch messages in real-time for each thread
            const msgsQ = query(
              collection(db, "dms", threadId, "messages"),
              orderBy("sentAt", "asc")
            );

            const unsubMsgs = onSnapshot(msgsQ, (msgsSnap) => {
              let unread = 0;
              let lastMessageText = "";
              let lastMessageAt = null;

              msgsSnap.forEach((msgDoc) => {
                const msg = msgDoc.data();
                lastMessageText = msg.text;
                lastMessageAt = msg.sentAt;

                // Only count if sent by the other user and after lastReadAt
                if (msg.senderId !== myUid) {
                  if (
                    !lastReadAt ||
                    msg.sentAt?.toMillis() > lastReadAt.toMillis?.()
                  ) {
                    unread++;
                  }
                }
              });

              const updatedChat: ChatSummary = {
                id: threadId,
                otherUid,
                otherUser,
                unread,
                lastMessageText,
                lastMessageAt,
              };

              setChats((prev) => {
                const filtered = prev.filter((c) => c.id !== threadId);
                const newArr = [...filtered, updatedChat];

                // sort newest first
                newArr.sort(
                  (a, b) =>
                    (b.lastMessageAt?.toMillis?.() ?? 0) -
                    (a.lastMessageAt?.toMillis?.() ?? 0)
                );

                // ✅ recalc total from newArr
                const newTotal = newArr.reduce(
                  (sum, c) => sum + (c.unread || 0),
                  0
                );
                setTotal(newTotal);

                return newArr;
              });
            });

            unsubMessages.push(unsubMsgs);
          })
        );

        setLoading(false);
      },
      (err) => {
        console.error("Unread hook error:", err);
        setError(err);
        setLoading(false);
      }
    );

    // cleanup both threads and message listeners
    return () => {
      unsubThreads();
      unsubMessages.forEach((fn) => fn());
    };
  }, [myUid]);

  return { total, chats, loading, error };
};

export default useUnreadCount;
