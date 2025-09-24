
import { useAuth } from "@muc/context";
import { UseUnreadCount } from "@muc/hooks";
import { db } from "@muc/libs";
import { doc, setDoc, Timestamp } from "firebase/firestore";


const UnreadTab = () => {
    const { user } = useAuth();
    const { total, chats, loading } = UseUnreadCount(user?.uid);
    const markThreadAsRead = async (threadId: string, myUid?: string) => {
        if (!myUid) return; // safety check

        const threadRef = doc(db, "dms", threadId);
        await setDoc(
            threadRef,
            { lastReadAt: { [myUid]: Timestamp.now() } },
            { merge: true }
        );
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Unread Messages ({total})</h2>
            {chats
                .filter((c) => c.unread > 0) // show only chats with unread
                .map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => markThreadAsRead(chat.id, user?.uid)}
                        className="cursor-pointer border-b py-2"
                    >
                        <strong>{chat.otherUser?.name || "Unknown"}</strong> -{" "}
                        {chat.unread} unread
                    </div>
                ))}
        </div>
    );
};

export default UnreadTab