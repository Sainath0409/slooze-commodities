
import { users } from "@/mock/users";

export const login = (email: string, password: string) => {
    // Check against mock database
    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (!user) throw new Error("Invalid credentials");

    localStorage.setItem(
        "session",
        JSON.stringify({
            token: "mock-jwt",
            role: user.role,
            email: user.email,
        })
    );

    return user;
};

export const logout = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("session");
        window.location.href = "/login";
    }
};
