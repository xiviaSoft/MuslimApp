// context/AuthContext.tsx
import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { User } from "@muc/collections";
import { auth, db } from "@muc/libs";

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    logout: () => Promise<void>;
}


const AuthContextData = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async (firebaseUser: FirebaseUser) => {
        try {
            const userRef = doc(db, "users", firebaseUser.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                setUser(userSnap.data() as User);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error("Error fetching user:", err);
            setUser(null);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setLoading(true);

            if (firebaseUser) {
                await fetchUserData(firebaseUser);
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await auth.signOut();
        setUser(null);
    };

    return (
        <AuthContextData.Provider value={{ user, setUser, loading, logout }}>
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
