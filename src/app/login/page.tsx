
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
import { users } from "@/mock/users";

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

            {/* 1. MOBILE/TABLET BACKGROUND (Visible only on screens < 1024px) */}
            <div className="lg:hidden fixed inset-0 z-0">
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
                        <div className="absolute inset-0 bg-black/60" />
                    </div>
                ))}
            </div>

            {/* 2. DESKTOP SIDE-BY-SIDE LAYOUT (Visible on screens >= 1024px) */}
            <div className="hidden lg:flex w-full min-h-screen">
                {/* Desktop Left: Image Carousel Section */}
                <div className="w-1/2 relative overflow-hidden bg-muted">
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

                {/* Desktop Right: Login Form Section */}
                <div className="w-1/2 flex items-center justify-center p-8 bg-background">
                    {/* The Login Card (Desktop Version) */}
                    <Card className="w-full max-w-md border-none shadow-none">
                        <LoginForm handleLogin={handleLogin} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
                    </Card>
                </div>
            </div>

            {/* 3. MOBILE/TABLET CENTERED FORM (Visible only on screens < 1024px) */}
            <div className="lg:hidden relative z-10 flex w-full items-center justify-center p-4 min-h-screen">
                <Card className="w-full max-w-md border-none shadow-2xl glassmorphism p-2">
                    <LoginForm handleLogin={handleLogin} email={email} setEmail={setEmail} password={password} setPassword={setPassword} isMobile />
                </Card>
            </div>
        </div>
    );
}

interface LoginFormProps {
    handleLogin: (e: React.FormEvent) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    isMobile?: boolean;
}

// Reusable Login Form Component for both layouts
function LoginForm({ handleLogin, email, setEmail, password, setPassword, isMobile = false }: LoginFormProps) {
    return (
        <>
            <CardHeader className="space-y-1">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                        <span className="text-primary-foreground font-bold text-2xl">S</span>
                    </div>
                </div>
                <CardTitle className={`text-3xl font-bold tracking-tight text-center ${isMobile ? 'text-white' : ''}`}>Welcome back</CardTitle>
                <CardDescription className={`text-center font-medium ${isMobile ? 'text-gray-200' : ''}`}>
                    Enter your credentials to access your dashboard
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
                <CardContent className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className={`text-sm font-semibold ${isMobile ? 'text-white' : ''}`}>Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`${isMobile ? 'bg-background/20 text-white backdrop-blur-md border-white/20 placeholder:text-gray-400' : 'bg-muted/50'} focus:ring-primary transition-all`}
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className={`text-sm font-semibold ${isMobile ? 'text-white' : ''}`}>Password</Label>
                            <Button type="button" variant="link" className={`p-0 h-auto text-xs font-normal ${isMobile ? 'text-gray-300 hover:text-white' : ''}`}>
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
                            className={`${isMobile ? 'bg-background/20 text-white backdrop-blur-md border-white/20 placeholder:text-gray-400' : 'bg-muted/50'} focus:ring-primary transition-all`}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 mt-6">
                    <Button className="w-full text-lg font-semibold py-6 shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98]" type="submit">
                        Sign in
                    </Button>
                    <p className={`text-sm text-center ${isMobile ? 'text-gray-300' : 'text-muted-foreground'}`}>
                        Don&apos;t have an account? <Button type="button" variant="link" className="p-0 h-auto font-semibold hover:text-primary">Contact admin</Button>
                    </p>
                </CardFooter>
            </form>
        </>
    );
}
