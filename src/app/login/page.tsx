
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";

const images = [
    {
        url: "/images/login/it-1.png",
        title: "Modern Tech Solutions",
        description: "Streamlining commodity management with cutting-edge technology."
    },
    {
        url: "/images/login/it-2.png",
        title: "Data-Driven Insights",
        description: "Real-time tracking and analytics at your fingertips."
    },
    {
        url: "/images/login/it-3.png",
        title: "Seamless Integration",
        description: "Connect your entire supply chain in one unified platform."
    }
];

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentImage, setCurrentImage] = useState(0);
    const { login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            login(email, password);

            toast.success("Login successful", {
                description: "Welcome back to Slooze Commodities",
            });

            // Since we're in a client component and using mock auth, 
            // we check the role after successful login
            const { users } = require("@/mock/users");
            const user = users.find((u: any) => u.email === email);

            if (user?.role === "MANAGER") {
                router.push("/dashboard");
            } else {
                router.push("/products");
            }

        } catch (err: any) {
            toast.error("Login failed", {
                description: err.message || "Invalid credentials",
            });
        }
    };

    return (
        <div className="flex min-h-screen w-full overflow-hidden bg-background">
            {/* Left Side: Image Carousel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-muted">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <Image
                            src={img.url}
                            alt={img.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-12 left-12 right-12 text-white space-y-4">
                            <h2 className="text-4xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                                {img.title}
                            </h2>
                            <p className="text-lg text-gray-200 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                {img.description}
                            </p>
                        </div>
                    </div>
                ))}

                {/* Carousel Indicators */}
                <div className="absolute bottom-8 left-12 flex gap-2">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentImage ? "w-8 bg-primary" : "w-2 bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-muted/30">
                <Card className="w-full max-w-md border-none shadow-2xl glassmorphism">
                    <CardHeader className="space-y-1">
                        <div className="flex justify-center mb-4 lg:hidden">
                            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-xl">S</span>
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-bold tracking-tight text-center">Welcome back</CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to access your dashboard
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-background/50"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Button type="button" variant="link" className="p-0 h-auto text-xs font-normal">
                                        Forgot password?
                                    </Button>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-background/50"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 mt-6">
                            <Button className="w-full text-lg font-semibold py-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300" type="submit">
                                Sign in
                            </Button>
                            <p className="text-sm text-muted-foreground text-center">
                                Don&apos;t have an account? <Button type="button" variant="link" className="p-0 h-auto">Contact your administrator</Button>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
