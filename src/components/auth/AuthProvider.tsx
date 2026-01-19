
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { users } from "@/mock/users"; // Access mock data directly

interface AuthContextType {
    session: any | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<any>(null);
    const router = useRouter();

    // Load session on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("session");
            if (stored) {
                setSession(JSON.parse(stored));
            }
        }
    }, []);

    const login = (email: string, password: string) => {
        // Logic moved from lib/auth.ts to here for state management
        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!user) throw new Error("Invalid credentials");

        const sessionData = {
            token: "mock-jwt",
            role: user.role,
            email: user.email,
        };

        localStorage.setItem("session", JSON.stringify(sessionData));
        setSession(sessionData); // Updates state immediately -> Layout re-renders
    };

    const logout = () => {
        localStorage.removeItem("session");
        setSession(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ session, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
