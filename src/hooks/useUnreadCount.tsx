// hooks/useUnreadCount.ts
import { db } from "@muc/libs";
import {
    collection,
    doc,
    FirestoreError,
    getDoc,
    onSnapshot,
    query,
 
    Timestamp,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useUnreadCount = (myUid: string | undefined) => {
    const [data, setData] = useState<{ total: number; chats: any[] }>({
        total: 0,
        chats: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<FirestoreError | null>(null);

    useEffect(() => {
        if (!myUid) return;

        const q = query(collection(db, "dms"), where("participants", "array-contains", myUid));

        const unsubThreads = onSnapshot(
            q,
            (snapshot) => {
                const unsubMessages: (() => void)[] = [];
                let chats: any[] = [];

                snapshot.docs.forEach((docSnap) => {
                    const thread = docSnap.data();
                    const otherUid = thread.participants.find((uid: string) => uid !== myUid);

                    const lastRead = thread.lastReadAt?.[myUid] as Timestamp | undefined;
                    const since = lastRead ?? Timestamp.fromMillis(0);

                    const msgsQ = query(
                        collection(db, "dms", docSnap.id, "messages"),
                        where("sentAt", ">", since),
                        where("senderId", "!=", myUid)
                    );

                    const unsubMsgs = onSnapshot(msgsQ, async (msgsSnap) => {
                        const unread = msgsSnap.size;

                        let otherUser = null;
                        if (otherUid) {
                            const userDoc = await getDoc(doc(db, "users", otherUid));
                            if (userDoc.exists()) {
                                otherUser = { id: userDoc.id, ...userDoc.data() };
                            }
                        }

                        const updatedChat = {
                            id: docSnap.id,
                            ...thread,
                            otherUid,
                            otherUser,
                            unread,
                        };

                        chats = [...chats.filter((c) => c.id !== docSnap.id), updatedChat];
                        const newTotal = chats.reduce((sum, c) => sum + c.unread, 0);

                        setData({ total: newTotal, chats });
                    });

                    unsubMessages.push(unsubMsgs);
                });

                setLoading(false);
                return () => unsubMessages.forEach((u) => u());
            },
            (err) => {
                console.error("Unread count error", err);
                setError(err);
                setLoading(false);
            }
        );

        return () => unsubThreads();
    }, [myUid]);

    return { ...data, loading, error };
};

// ✅ Call this when user opens Unread tab or opens a chat

export default useUnreadCount;
