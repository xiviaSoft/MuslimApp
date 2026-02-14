import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "@muc/libs";
import { useToast } from "../context/ToastContext";

export const useMessageNotifications = () => {
  const { showToast } = useToast();
  const location = useLocation();

  const myUid = auth.currentUser?.uid;
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!myUid) return;

    const q = query(
      collection(db, "dms"),
      where("participants", "array-contains", myUid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Skip the initial load
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified" || change.type === "added") {
          const data = change.doc.data();
          const lastSenderId = data.lastMessageSenderId;
          const text = data.lastMessageText;

          // Identify the other user in this chat
          const otherUid = data.participants.find(
            (uid: string) => uid !== myUid,
          );

          // 1. Check if I am the sender (ignore)
          if (lastSenderId === myUid) return;

          // 2. Check if I am currently in this chat
          // The route is typically /messages/:otherUid
          const isInChat = location.pathname === `/messages/${otherUid}`;

          if (!isInChat) {
            showToast(`New message: ${text}`, "info");
          }
        }
      });
    });

    return () => unsubscribe();
  }, [myUid, location.pathname, showToast]);
};
