// UserContext.tsx
import { createContext, useContext } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@muc/libs";


export type User = {
    id: string;
    [key: string]: any; // extend with your user fields
};

interface UserContextType {
    users: User[];
    isLoading: boolean;
    isError: boolean;
}

const AllUserContext = createContext<UserContextType | undefined>(undefined);

export const AllUserProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: users = [], isLoading, isError } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const snapshot = await getDocs(collection(db, "users"));
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as User[];
        },
        placeholderData: keepPreviousData,


    });


    return (
        <AllUserContext.Provider value={{ users, isLoading, isError }}>
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
