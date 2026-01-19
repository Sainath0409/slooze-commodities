
"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const { session } = useAuth();

    // If no session, render simple layout (likely login)
    if (!session) {
        return <>{children}</>;
    }

    // Authenticated layout
    return (
        <div className="flex h-screen bg-muted/40 overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden md:block h-full">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
