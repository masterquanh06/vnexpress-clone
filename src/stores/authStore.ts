import { create } from "zustand";

interface AuthState {
    accessToken: string | null;
    user: any | null;
    setAccessToken: (token: string | null) => void;
    setUser: (user: any | null) => void;
    logout: () => void;
}

const getInitialAccessToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("accessToken");
    }
    return null;
};

const getInitialUser = () => {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }
    return null;
};

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: getInitialAccessToken(),
    user: getInitialUser(),
    setAccessToken: (token) => {
        set({ accessToken: token });
        if (typeof window !== "undefined") {
            if (token) localStorage.setItem("accessToken", token);
            else localStorage.removeItem("accessToken");
        }
    },
    setUser: (user) => {
        set({ user });
        if (typeof window !== "undefined") {
            if (user) localStorage.setItem("user", JSON.stringify(user));
            else localStorage.removeItem("user");
        }
    },
    logout: () => {
        set({ accessToken: null, user: null });
        if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
        }
    }
}));