import { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@muc/libs";

export type User = {
    id: string;
    blocked?: string[]; // array of blocked userIds
    isVisible?: boolean; // other users can see them
    [key: string]: any;
};

interface UserContextType {
    users: User[];
    isLoading: boolean;
    isError: boolean;
    myBlocked: string[];
    isVisible: boolean; // your visibility for others
}

const AllUserContext = createContext<UserContextType | undefined>(undefined);

export const AllUserProvider = ({
    children,
    myUid,
}: {
    children: React.ReactNode;
    myUid: string;
}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [myBlocked, setMyBlocked] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!myUid) {
            setIsLoading(false);
            return;
        }

        try {
            // 🔹 Listen to all users
            const unsubscribeUsers = onSnapshot(
                collection(db, "users"),
                (snapshot) => {
                    const usersList = snapshot.docs.map(
                        (docSnap) =>
                        ({
                            id: docSnap.id,
                            ...docSnap.data(),
                        } as User)
                    );
                    setAllUsers(usersList);
                    setIsLoading(false);
                },
                (err) => {
                    console.error("Error in users snapshot:", err);
                    setIsError(true);
                    setIsLoading(false);
                }
            );

            // 🔹 Listen to my own user doc
            const unsubscribeMe = onSnapshot(
                doc(db, "users", myUid),
                (myDoc) => {
                    const data = myDoc.data();
                    setMyBlocked((data?.blocked as string[]) || []);
                    setIsVisible(data?.isVisible ?? true); // this controls if others see you
                    setIsLoading(false);
                },
                (err) => {
                    console.error("Error in my user snapshot:", err);
                    setIsError(true);
                    setIsLoading(false);
                }
            );

            return () => {
                unsubscribeUsers();
                unsubscribeMe();
            };
        } catch (err) {
            console.error("Error listening to users:", err);
            setIsError(true);
            setIsLoading(false);
        }
    }, [myUid]);

    // 🔹 Filter users for display: we always see all other users
    useEffect(() => {
        if (!myUid) return;

        const filtered = allUsers.filter(
            (user) =>
                user.id !== myUid &&             // exclude yourself
                !user.blocked?.includes(myUid) && // they didn’t block me
                !myBlocked.includes(user.id) &&   // I didn’t block them
                user.isVisible !== false           // only show users who are visible
        );

        setUsers(filtered);
    }, [allUsers, myBlocked, myUid]);

    return (
        <AllUserContext.Provider value={{ users, isLoading, isError, myBlocked, isVisible }}>
            {children}
        </AllUserContext.Provider>
    );
};

// Custom hook
export const useUsers = () => {
    const ctx = useContext(AllUserContext);
    if (!ctx) throw new Error("useUsers must be used within a UserProvider");
    return ctx;
};
