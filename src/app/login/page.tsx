
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
        <div className="flex min-h-screen w-full overflow-hidden bg-background relative">
            {/* Background Carousel (Visible on all devices) */}
            <div className="fixed inset-0 z-0">
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
                        {/* Overlay to ensure readability */}
                        <div className="absolute inset-0 bg-black/50 lg:bg-black/20" />
                    </div>
                ))}
            </div>

            {/* Left Side: Text Content (Hidden on Mobile/Tablet, visible on LG) */}
            <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-end p-12 text-white">
                <div className="space-y-4 max-w-lg mb-12">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-700 ${index === currentImage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute"
                                }`}
                        >
                            {index === currentImage && (
                                <>
                                    <h2 className="text-5xl font-bold tracking-tight mb-4">
                                        {img.title}
                                    </h2>
                                    <p className="text-xl text-gray-200">
                                        {img.description}
                                    </p>
                                </>
                            )}
                        </div>
                    ))}

                    {/* Carousel Indicators (only for visual feedback on text change) */}
                    <div className="flex gap-2 mt-8">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentImage ? "w-8 bg-primary" : "w-2 bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side / Center Content: Login Form */}
            <div className="relative z-10 flex w-full lg:w-1/2 items-center justify-center p-4 sm:p-8">
                <Card className="w-full max-w-md border-none shadow-2xl glassmorphism animate-in fade-in zoom-in duration-500">
                    <CardHeader className="space-y-1">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                                <span className="text-primary-foreground font-bold text-2xl">S</span>
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-bold tracking-tight text-center">Welcome back</CardTitle>
                        <CardDescription className="text-center font-medium">
                            Enter your credentials to access your dashboard
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-background/20 backdrop-blur-md border-white/20 focus:bg-background/40 transition-all"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" name="password" className="text-sm font-semibold">Password</Label>
                                    <Button type="button" variant="link" className="p-0 h-auto text-xs font-normal text-primary-foreground/80 hover:text-primary-foreground">
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
                                    className="bg-background/20 backdrop-blur-md border-white/20 focus:bg-background/40 transition-all"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 mt-6">
                            <Button className="w-full text-lg font-semibold py-6 shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98]" type="submit">
                                Sign in
                            </Button>
                            <p className="text-sm text-center text-muted-foreground">
                                Don&apos;t have an account? <Button type="button" variant="link" className="p-0 h-auto font-semibold hover:text-primary">Contact admin</Button>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
