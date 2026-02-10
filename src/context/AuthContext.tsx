import { loginAuth } from "@/services/authService";
import { IAuthRequest, IAuthResponse } from "@/types/auth";
import { getStorage, removeStorage, setStorage } from "@/utils/storage";
import { useState, createContext, useContext, useEffect } from "react";

export interface IAuthContext {
    user: IAuthResponse | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: IAuthRequest) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IAuthResponse | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = getStorage("user");
        const storedToken = getStorage("accessToken");
        if (storedUser && storedToken) {
            setUser(storedUser);
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [])

    const login = async (data: IAuthRequest) => {
        setIsLoading(true);
        try {
            const response = await loginAuth(data);

            if (response && response.accessToken) {
                setUser(response);
                setIsAuthenticated(true);
                setStorage("user", response);
                setStorage("accessToken", response.accessToken);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        removeStorage("user");
        removeStorage("accessToken");
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}