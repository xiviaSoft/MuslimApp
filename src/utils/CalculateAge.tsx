import { Timestamp } from "firebase/firestore";

export const calculateAge = (
    dob?: Timestamp | { seconds?: number; nanoseconds?: number } | string | number | Date | null
): number | null => {
    if (!dob && dob !== 0) return null;

    let birthDate: Date | null = null;

    // 1) number: could be age, seconds, or ms
    if (typeof dob === "number") {
        // If number looks like an already stored "age" (<= 150), treat as age.
        if (dob > 0 && dob <= 150) return Math.floor(dob);

        // seconds since epoch (common)
        if (dob > 1e9 && dob < 1e13) {
            birthDate = new Date(dob > 1e11 ? dob : dob * 1000); // if >1e11 likely ms; else seconds *1000
        } else {
            // fallback: treat as ms
            birthDate = new Date(dob);
        }
    }
    // 2) Firestore Timestamp instance or object with toDate()
    else if (dob instanceof Timestamp || typeof (dob as any)?.toDate === "function") {
        birthDate = (dob as any).toDate();
    }
    // 3) plain object with seconds (e.g. _Timestamp or serialized)
    else if ((dob as any)?.seconds && typeof (dob as any).seconds === "number") {
        birthDate = new Date((dob as any).seconds * 1000);
    }
    // 4) string — try YYYY-MM-DD first (safe, timezone-free)
    else if (typeof dob === "string") {
        const parts = dob.split(/[-/]/).map((p) => p.trim());
        if (parts.length === 3 && /^\d{4}$/.test(parts[0])) {
            const [year, month, day] = parts.map(Number);
            birthDate = new Date(Date.UTC(year, month - 1, day)); // use UTC to avoid TZ shifts
        } else {
            // fallback to Date parser for ISO strings
            birthDate = new Date(dob);
        }
    }
    // 5) already a Date
    else if (dob instanceof Date) {
        birthDate = dob;
    }

    if (!birthDate || isNaN(birthDate.getTime())) {
        console.warn("⚠️ Invalid birth date in calculateAge:", dob);
        return null;
    }

    // compute age using UTC to avoid timezone off-by-one
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const birthUTC = new Date(Date.UTC(birthDate.getUTCFullYear(), birthDate.getUTCMonth(), birthDate.getUTCDate()));

    let age = todayUTC.getUTCFullYear() - birthUTC.getUTCFullYear();
    const monthDiff = todayUTC.getUTCMonth() - birthUTC.getUTCMonth();
    const dayDiff = todayUTC.getUTCDate() - birthUTC.getUTCDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;

    return age < 0 ? 0 : age;
};