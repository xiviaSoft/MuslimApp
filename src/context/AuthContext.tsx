import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { User } from "@muc/collections";
import { auth, db } from "@muc/libs";

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    logout: () => Promise<void>;
    login: (data: { email: string; password: string }) => Promise<void>;
}

const AuthContextData = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setLoading(true);

            if (firebaseUser) {
                const userRef = doc(db, 'users', firebaseUser.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setUser(userDoc.data() as User);
                }
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        console.log("user logout");
    };

    const login = async (data: { email: string; password: string }) => {
        await signInWithEmailAndPassword(auth, data.email, data.password);

    };

    return (
        <AuthContextData.Provider value={{ user, setUser, loading, logout, login }}>
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
