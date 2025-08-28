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
  Skills,
  WorkerExperience,
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
  workExperience?: WorkerExperience[];
  skills?: Skills;
  preferences?: {
    language?: string;
    notifications?: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  religion: string;
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

//Future work
// export interface
