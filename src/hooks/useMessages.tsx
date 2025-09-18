import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { db } from "@muc/libs";
import { threadIdFor, messagesCol } from "@muc/collections";
import { onSnapshot, orderBy, query, getDocs } from "firebase/firestore";

const useMessages = (meUid: string, otherUid: string) => {
  const queryClient = useQueryClient();
  const threadId = threadIdFor(meUid, otherUid);

  // Initial fetch (fallback, in case snapshot lags)
  const messagesQuery = useQuery({
    queryKey: ["messages", threadId],
    queryFn: async () => {
      const q = query(messagesCol(db, threadId), orderBy("sentAt", "asc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    enabled: !!meUid && !!otherUid,
    placeholderData:[]
  });


  useEffect(() => {
    if (!meUid || !otherUid) return;

    const q = query(messagesCol(db, threadId), orderBy("sentAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 🔥 update React Query cache directly
      queryClient.setQueryData(["messages", threadId], newMessages);
    });

    return () => unsubscribe();
  }, [meUid, otherUid, queryClient, threadId]);

  return messagesQuery;
};

export default useMessages;
