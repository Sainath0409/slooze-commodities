
"use client";

import { LayoutDashboard, Package, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider"; // Updated import
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";



const menu = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
        roles: ["MANAGER"],
    },
    {
        label: "Products",
        icon: Package,
        path: "/products",
        roles: ["MANAGER", "STORE_KEEPER"],
    },
];

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
    const { session, logout } = useAuth();
    const pathname = usePathname();

    if (!session) return null;

    return (
        <aside className="w-64 border-r h-full bg-background flex flex-col justify-between">
            <div className="p-4">
                <div className="mb-8 pl-2 hidden md:block">
                    <h1 className="text-xl font-bold tracking-tight">Slooze Cmd.</h1>
                    <p className="text-xs text-muted-foreground">Commodities Management</p>
                </div>
                <div className="mb-8 pl-2 md:hidden">
                    <h1 className="text-xl font-bold tracking-tight">Menu</h1>
                </div>
                <nav className="space-y-2">
                    {menu
                        .filter((item) => item.roles.includes(session.role))
                        .map((item) => {
                            // Ensure partial matching validation for sub-routes if needed, or exact
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.path}
                                    onClick={onNavigate}
                                    className={`flex items-center gap-2 p-2 rounded-md transition-colors 
                    ${isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </Link>
                            );
                        })}
                </nav>
            </div>


            <div className="p-4 border-t bg-muted/20">
                <div className="flex items-center gap-3 w-full p-2 mb-3 rounded-md hover:bg-muted/50 transition-colors">
                    <Avatar className="h-9 w-9 border">
                        <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${session.email}`} alt={session.email} />
                        <AvatarFallback>{session.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left text-sm leading-tight overflow-hidden">
                        <span className="truncate font-semibold">{session.email?.split('@')[0]}</span>
                        <span className="truncate text-xs text-muted-foreground capitalize">
                            {session.role.toLowerCase().replace('_', ' ')}
                        </span>
                    </div>
                </div>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-center gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 border-dashed"
                        >
                            <LogOut size={16} />
                            Log out
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Sign out</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to sign out of your account?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={logout}>Sign out</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>

        </aside>
    );
}
