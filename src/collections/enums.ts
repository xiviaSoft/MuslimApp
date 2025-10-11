//enums
export enum AdminRole {
  superAdmin = "super_admin",
  moderator = "moderator",
  support = "support",
  editor = "editor",
}
export enum Gender {
  male = "male",
  female = "female",
}
export enum MaritalStatus {
  single = "single",
  married = "married",
  divorced = "divorced",
  widowed = "widowed",
}
export enum ReasonType {
  spam = "spam",
  abuse = "abuse",
  violation_of_terms = "violation_of_terms",
  fraud = "fraud",
  inactivity = "inactivity",
  other = "other",
}
export enum NotificationType {
  other = "other",
  update = "update",
  message = "message",
  reminder = "reminder",
  promotion = "promotion",
  system_alert = "system_alert",
  friend_request = "friend_request",
}
export enum NotificationCreatedByInfo {
  admin = "admin",
  system = "system",
  friend = "friend",
}
export enum Skills {
  technicalSkills = "technicalSkills", // e.g., ['JavaScript', 'React', 'Node.js']
  softSkills = "softSkills", // e.g., ['Communication', 'Teamwork']
  languages = "languages", // e.g., ['English', 'Spanish']
}

export enum HelpSupportStatus {
  open = "open",
  in_progress = "in_progress",
  resolved = "resolved",
  closed = "closed",
}
//types
export type UserProfileImage = {
  url: string;
  isPublic: boolean;
};

export type Education = {
  highestDegree?: string;
  fieldOfStudy?: string;
  institutionName?: string;
  graduationYear?: number;
};
export type WorkerExperience = {
  companyName: string;
  role: string;
  startDate: Date | string;
  endDate?: Date | string; // If currently working, this can be undefined
  isCurrent?: boolean; // To indicate if it's the current job
  description?: string; // Optional description of the role
};

export type SkillsType = {
  technicalSkills?: string[]; // e.g., ['JavaScript', 'React', 'Node.js']
  softSkills?: string[]; // e.g., ['Communication', 'Teamwork']
  languages?: string[]; // e.g., ['English', 'Spanish']
};

// export enum ActionType {
//   Like = "like",
//   Visit = "visit",
// }
