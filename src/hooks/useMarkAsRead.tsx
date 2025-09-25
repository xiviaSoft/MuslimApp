// hooks/useMarkAsRead.ts
import { db } from "@muc/libs";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useCallback } from "react";

const useMarkAsRead = () => {
  const markThreadAsRead = useCallback(async (threadId: string, myUid: string) => {
    if (!threadId || !myUid) {
      console.error(" markThreadAsRead: Missing threadId or myUid");
      return;
    }

    try {


      const threadRef = doc(db, "dms", threadId);
      await updateDoc(threadRef, {
        [`lastReadAt.${myUid}`]: serverTimestamp(),
        // Clear manual unread flag when marking as read
        [`markedUnread.${myUid}`]: false,
      });

  
    } catch (error) {
      console.error(" Error marking thread as read:", error);
    }
  }, []);

  const markThreadAsUnread = useCallback(async (threadId: string, myUid: string) => {
    if (!threadId || !myUid) {

      return;
    }

    try {
    

      const threadRef = doc(db, "dms", threadId);
      await updateDoc(threadRef, {
        // Do not touch lastReadAt; just set a manual flag like WhatsApp
        [`markedUnread.${myUid}`]: true,
      });

      console.log(`✅ Successfully marked thread ${threadId} as UNREAD (manual)`);
    } catch (error) {
      console.error(" Error marking thread as unread:", error);
    }
  }, []);

  return { markThreadAsRead, markThreadAsUnread };
}
export default useMarkAsRead