import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { User } from "@muc/collections";
import { auth, db } from "@muc/libs";
import { useQuery } from "@tanstack/react-query";

interface AuthContextType {
    user: User | null;
    // setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    logout: () => Promise<void>;
    login: (data: { email: string; password: string }) => Promise<void>;
}

const AuthContextData = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setuser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setuser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);


    const { data: userData, isLoading } = useQuery({
        queryKey: ["user", user?.uid],
        queryFn: async () => {
            if (!user) return null;
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            return userDoc.exists() ? (userDoc.data() as User) : null;
        },
        enabled: !!user
    });

    const logout = async () => {
        await signOut(auth);
        setuser(null);
        console.log("user logout");
    };

    const login = async (data: { email: string; password: string }) => {
        await signInWithEmailAndPassword(auth, data.email, data.password);
    };

    return (
        <AuthContextData.Provider
            value={{
                user: userData ?? null,
                loading: loading || isLoading,

                logout,
                login,
            }}
        >
            {children}
        </AuthContextData.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContextData);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
