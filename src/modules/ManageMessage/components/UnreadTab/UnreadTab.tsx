
// import { useAuth } from "@muc/context";
// import { UseUnreadCount } from "@muc/hooks";

// import UserMessageCard from "../UserMessageCard/UserMessageCard";


// const UnreadTab = () => {
//     const { user } = useAuth();
//     const { total, chats, loading } = UseUnreadCount(user?.uid);


//     if (loading) return <div>Loading...</div>;

//     console.log(chats, 'chats in the unread tab')
//     return (
//         <div>
//             <h2>Unread Messages ({total})</h2>
//             {chats
//                 .filter((c) => c.unread > 0)
//                 .map((chat) => (
//                     <UserMessageCard
//                         key={chat.id}
//                         firstName={chat.otherUser?.firstName ?? ""}
//                         lastName={chat.otherUser?.lastName ?? ""}
//                         lastMessageText={chat.lastMessageText ?? ""}
//                         uid={chat.otherUid}
//                         threadId={chat.id}
//                     />
//                     // <div
//                     //     key={chat.id}
//                     //     onClick={() => markThreadAsRead(chat.id, user?.uid)}
//                     //     className="cursor-pointer border-b py-2"
//                     // >
//                     //     <strong>{chat.otherUser?.name || "Unknown"}</strong> -{" "}
//                     //     {chat.unread} unread
//                     // </div>
//                 ))}
//         </div>
//     );
// };

// export default UnreadTab