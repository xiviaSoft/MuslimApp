import { getDocs, orderBy, query } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { db } from "@muc/libs";
import { threadIdFor, messagesCol } from "@muc/collections"; // assuming you already have this helper

const useMessages = (meUid: string, otherUid: string) => {
    return useQuery({
        queryKey: ["messages", threadIdFor(meUid, otherUid)],
        queryFn: async () => {
            const q = query(messagesCol(db, threadIdFor(meUid, otherUid)), orderBy("sentAt", "asc"));
            const snapshot = await getDocs(q);
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        },
        enabled: !!meUid && !!otherUid,
    });
};

export default useMessages