
"use client";

import { useAuth } from "@/components/auth/AuthProvider"; // Update import
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoleGuard({
    allowedRoles,
    children,
}: {
    allowedRoles: string[];
    children: React.ReactNode;
}) {
    const { session } = useAuth();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Small timeout to allow session to load from localstorage in Provider
        const check = () => {
            if (!session) {

                const stored = localStorage.getItem("session");
                if (!stored) {
                    router.push("/login");
                }
                return;
            }

            if (!allowedRoles.includes(session.role)) {
                router.push("/login"); // or forbidden
            } else {
                setAuthorized(true);
            }
        }
        check();
    }, [session, allowedRoles, router]);

    if (!authorized && !session) return null; // Prevent flash

    return <>{children}</>;
}
