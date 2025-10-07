// utils/dateHelpers.ts
export const formatDateForInput = (date?: any): string => {
  if (!date) return ""; // ✅ No date → return empty string
  try {
    // Firestore Timestamp → Date
    if (date?.seconds) date = new Date(date.seconds * 1000);

    // String → Date
    const jsDate = date instanceof Date ? date : new Date(date);

    // Invalid date → return empty string
    if (isNaN(jsDate.getTime())) return "";

    // ✅ Format yyyy-MM-dd
    return jsDate.toISOString().split("T")[0];
  } catch {
    return "";
  }
};
