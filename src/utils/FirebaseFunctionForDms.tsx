import { DmMessage, DmThread, NewDmMessage, NewDmThread } from "@muc/collections";
import { collection, CollectionReference, doc, DocumentReference, Firestore, FirestoreDataConverter, Timestamp } from "firebase/firestore";


export const threadIdFor = (a: string, b: string) =>
    [a, b].sort().join("_") as `${string}_${string}`;

// Path helpers
export const dmsCol = (db: Firestore): CollectionReference<DmThread> =>
    collection(db, "dms").withConverter(dmThreadConverter);

export const dmDoc = (
    db: Firestore,
    threadId: string
): DocumentReference<DmThread> =>
    doc(db, "dms", threadId).withConverter(dmThreadConverter);

export const messagesCol = (
    db: Firestore,
    threadId: string
): CollectionReference<DmMessage> =>
    collection(db, "dms", threadId, "messages").withConverter(dmMessageConverter);

export const messageDoc = (
    db: Firestore,
    threadId: string,
    messageId: string
): DocumentReference<DmMessage> =>
    doc(db, "dms", threadId, "messages", messageId).withConverter(
        dmMessageConverter
    );

// ========== Converters (optional but recommended) ==========

const dmThreadConverter: FirestoreDataConverter<DmThread> = {
    toFirestore: (t: DmThread | NewDmThread) => ({
        participants: t.participants,
        createdAt: t.createdAt,
        lastMessageText: t.lastMessageText,
        lastMessageSenderId: t.lastMessageSenderId,
        lastMessageAt: t.lastMessageAt,
    }),
    fromFirestore: (snap) => {
        const d = snap.data();
        return {
            participants: d.participants as [string, string],
            createdAt: d.createdAt as Timestamp,
            lastMessageText: (d.lastMessageText ?? "") as string,
            lastMessageSenderId: (d.lastMessageSenderId ?? "") as string,
            lastMessageAt: d.lastMessageAt as Timestamp,
        };
    },
};

const dmMessageConverter: FirestoreDataConverter<DmMessage> = {
    toFirestore: (m: DmMessage | NewDmMessage) => ({
        senderId: m.senderId,
        text: m.text,
        sentAt: m.sentAt,
        ...(m.editedAt ? { editedAt: m.editedAt } : {}),
        ...(m.isDeleted !== undefined ? { isDeleted: m.isDeleted } : {}),
    }),
    fromFirestore: (snap) => {
        const d = snap.data();
        return {
            senderId: d.senderId as string,
            text: d.text as string,
            sentAt: d.sentAt as Timestamp,
            ...(d.editedAt ? { editedAt: d.editedAt as Timestamp } : {}),
            ...(d.isDeleted !== undefined ? { isDeleted: Boolean(d.isDeleted) } : {}),
        };
    },
};

