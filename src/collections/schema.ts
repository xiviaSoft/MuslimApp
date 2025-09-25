import { Timestamp } from "firebase/firestore";
import {
  MaritalStatus,
  UserProfileImage,
  AdminRole,
  Education,
  Gender,
  HelpSupportStatus,
  NotificationCreatedByInfo,
  NotificationType,
  ReasonType,
  WorkerExperience,
  SkillsType,
} from "./enums";

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profileImageData: UserProfileImage;
  userGallery?: Array<UserProfileImage>;
  gender: Gender;
  dateOfBirth: Date;
  maritalStatus: MaritalStatus;
  address?: string;
  bio?: string; //Short biography or description
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    [key: string]: string | undefined; // For any additional social links
  };
  hideProfile: boolean;
  createdAt: Date; //firebase server timestamp
  updatedAt: Date; //firebase server timestamp
  lastLogin: Date; //firebase server timestamp
  isActive: boolean;
  isSuspended: boolean;
  suspendedInformation?: {
    reason: ReasonType;
    suspendedAt: Date;
    suspendedBy: string; //need to change it to firebase ref
    suspendingDuration?: string; //e.g., "7 days", "indefinite"
    details: string; //additional details about suspension
  };
  location: {
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    addressLine1?: string;
    addressLine2?: string;
    coordinates?: {
      latitude: GeolocationPosition["coords"]["latitude"];
      longitude: GeolocationPosition["coords"]["longitude"];
    };
  };
  educationInformation: Education;
  workExperience?: WorkerExperience;
  skills?: SkillsType;
  language?: string;
  preferences?: {
    notifications?: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  religion: string;
  blocked?: string[];
  likes?: string[]; // Array of user IDs that this user has liked
  visits?: string[]; // Array of user IDs that this user has visited
}
export interface Admin {
  adminId: string;
  name: string;
  email: string;
  role: AdminRole;
  phoneNumber?: string;
  profileImageData: UserProfileImage;
  createdAt: Date; // Firebase server timestamp
  lastLogin: Date; // Firebase server timestamp
  isActive: boolean;
}
export interface Notification {
  // userId: string; // Reference to the user //when saving in the data base you need to remove it
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date; // Firebase server timestamp
  readAt?: Date; // Firebase server timestamp, optional
  type: NotificationType;
  createdBy: {
    idRef: string;
    typeValue: NotificationCreatedByInfo;
  };
  relatedLink?: string; // Optional link related to the notification
}

export interface HelpSupport {
  userId: string; // need to change to firebase Ref Reference to the user
  subject: string;
  message: string; //short summary of the issue 100-300 characters
  attachmentUrls?: string[]; // URLs of any attachments
  status: "open" | "in_progress" | "resolved" | "closed";
  createdAt: Date; // Firebase server timestamp
  updatedAt: Date; // Firebase server timestamp
  resolvedAt?: Date; // Firebase server timestamp, optional
  responseMessage?: string; // Message from support team, optional
}
export interface TermsAndConditions {
  id: string;
  version: string; // e.g., "1.0", "2.1"
  content: string; // The actual terms and conditions text
  effectiveDate: Date; // When these terms become effective
  createdAt: Date; // Firebase server timestamp
  updatedAt: Date; // Firebase server timestamp
}
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string; // Optional category for grouping FAQs
  createdAt: Date; // Firebase server timestamp
  updatedAt: Date; // Firebase server timestamp
}
export interface Report {
  id: string;
  reporterUserId: string; // Reference to the user who is reporting
  reportedUserId?: string; // Reference to the user being reported, if applicable
  contentId?: string; // Reference to the content being reported, if applicable
  reason: ReasonType;
  details?: string; // Additional details about the report
  status: HelpSupportStatus;
  createdAt: Date; // Firebase server timestamp
  reviewedAt?: Date; // Firebase server timestamp, optional
  reviewedBy?: string; // Reference to the admin who reviewed, optional
  actionDetails?: string; // Details of the action taken, optional
}

export interface Review {
  id: string;
  reviewerUserId: string; // Reference to the user who wrote the review
  revieweeUserId: string; // Reference to the user being reviewed
  rating: number; // e.g., 1 to 5 stars
  comment?: string; // Optional textual review
  createdAt: Date; // Firebase server timestamp
  updatedAt: Date; // Firebase server timestamp
}

// -------------------------------
// Firestore TypeScript Schema
// Simple 1-to-1 TEXT DMs
// -------------------------------

// ========== Core Types ==========

// A DM thread between exactly two users.
export interface DmThread {
  participants: [string, string]; // exactly two UIDs, sorted ascending
  createdAt: Timestamp; // set with serverTimestamp()
  lastMessageText: string; // latest text ("" if none yet)
  lastMessageSenderId: string; // "" if none yet
  lastMessageAt: Timestamp; // set with serverTimestamp()
  lastReadAt?: Record<string, Timestamp>;
}

// A single text message inside a thread.
export interface DmMessage {
  senderId: string; // UID of author
  text: string; // plain text only
  sentAt: Timestamp; // set with serverTimestamp()
  // Optional light editing/soft delete (omit if you don't need):
  editedAt?: Timestamp;
  isDeleted?: boolean;
}
export interface NewDmMessage {
  senderId: string;
  text: string;
  sentAt: Timestamp; // serverTimestamp()
  editedAt?: Timestamp;
  isDeleted?: boolean;
  lastReadAt?: Record<string, Timestamp>;
}
// For writes where server generates timestamps:
export interface NewDmThread {
  participants: [string, string];
  createdAt: Timestamp; // serverTimestamp()
  lastMessageText: string;
  lastMessageSenderId: string;
  lastMessageAt: Timestamp; // serverTimestamp()
}


// ========== Helpers ==========

// Deterministic thread ID to avoid duplicates: "uidA_uidB"
// export const threadIdFor = (a: string, b: string) =>
//   [a, b].sort().join("_") as `${string}_${string}`;

// // Path helpers
// export const dmsCol = (db: Firestore): CollectionReference<DmThread> =>
//   collection(db, "dms").withConverter(dmThreadConverter);

// export const dmDoc = (
//   db: Firestore,
//   threadId: string
// ): DocumentReference<DmThread> =>
//   doc(db, "dms", threadId).withConverter(dmThreadConverter);

// export const messagesCol = (
//   db: Firestore,
//   threadId: string
// ): CollectionReference<DmMessage> =>
//   collection(db, "dms", threadId, "messages").withConverter(dmMessageConverter);

// export const messageDoc = (
//   db: Firestore,
//   threadId: string,
//   messageId: string
// ): DocumentReference<DmMessage> =>
//   doc(db, "dms", threadId, "messages", messageId).withConverter(
//     dmMessageConverter
//   );

// // ========== Converters (optional but recommended) ==========

// const dmThreadConverter: FirestoreDataConverter<DmThread> = {
//   toFirestore: (t: DmThread | NewDmThread) => ({
//     participants: t.participants,
//     createdAt: t.createdAt,
//     lastMessageText: t.lastMessageText,
//     lastMessageSenderId: t.lastMessageSenderId,
//     lastMessageAt: t.lastMessageAt,
//   }),
//   fromFirestore: (snap) => {
//     const d = snap.data();
//     return {
//       participants: d.participants as [string, string],
//       createdAt: d.createdAt as Timestamp,
//       lastMessageText: (d.lastMessageText ?? "") as string,
//       lastMessageSenderId: (d.lastMessageSenderId ?? "") as string,
//       lastMessageAt: d.lastMessageAt as Timestamp,
//     };
//   },
// };

// const dmMessageConverter: FirestoreDataConverter<DmMessage> = {
//   toFirestore: (m: DmMessage | NewDmMessage) => ({
//     senderId: m.senderId,
//     text: m.text,
//     sentAt: m.sentAt,
//     ...(m.editedAt ? { editedAt: m.editedAt } : {}),
//     ...(m.isDeleted !== undefined ? { isDeleted: m.isDeleted } : {}),
//   }),
//   fromFirestore: (snap) => {
//     const d = snap.data();
//     return {
//       senderId: d.senderId as string,
//       text: d.text as string,
//       sentAt: d.sentAt as Timestamp,
//       ...(d.editedAt ? { editedAt: d.editedAt as Timestamp } : {}),
//       ...(d.isDeleted !== undefined ? { isDeleted: Boolean(d.isDeleted) } : {}),
//     };
//   },
// };

// ========== Minimal usage examples ==========
//
// import { serverTimestamp, addDoc, setDoc, updateDoc, query, where, orderBy, limit } from "firebase/firestore";
//
// // 1) Ensure thread exists (create-if-missing)
// const tid = threadIdFor(meUid, otherUid);
// await setDoc(
//   dmDoc(db, tid),
//   {
//     participants: [meUid, otherUid].sort() as [string, string],
//     createdAt: serverTimestamp() as Timestamp,
//     lastMessageText: "",
//     lastMessageSenderId: "",
//     lastMessageAt: serverTimestamp() as Timestamp
//   },
//   { merge: true }
// );
//
// // 2) Send a message
// const msgRef = await addDoc(messagesCol(db, tid), {
//   senderId: meUid,
//   text: inputText,
//   sentAt: serverTimestamp() as Timestamp
// } satisfies NewDmMessage);
//
// await updateDoc(dmDoc(db, tid), {
//   lastMessageText: inputText,
//   lastMessageSenderId: meUid,
//   lastMessageAt: serverTimestamp() as Timestamp
// });
//
// // 3) Queries
// // My chat list
// const chatListQ = query(
//   dmsCol(db),
//   where("participants", "array-contains", meUid),
//   orderBy("lastMessageAt", "desc"),
//   limit(30)
// );
//
// // Messages in a thread (old → new)
// const msgsQ = query(messagesCol(db, tid), orderBy("sentAt", "asc"), limit(50));

//Future work
// export interface UserAction {
//   id: string;             // Unique action ID (Firestore doc id)
//   userId: string;        // User performing the action
//   targetId: string;       // User who receives the action (liked/visited/messaged)
//   actionType: ActionType; // Type of action
//   description?: string;   // Optional details (e.g., "Liked profile picture")
//   createdAt: Date;        // Timestamp (Firestore serverTimestamp)
// }
