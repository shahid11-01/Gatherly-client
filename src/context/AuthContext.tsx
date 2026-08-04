import * as authService from "@/src/services/authService";
import { User } from "@/src/types/auth";
import { getAccessToken, getRefreshToken, removeTokens, saveTokens } from "@/src/utils/tokenStorage";
import {
    createContext, ReactNode, useCallback, useContext, useEffect, useState,
} from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    initializing: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userName: string, email: string, userPhone: string, password: string) => Promise<void>;
    googleLogin: (idToken: string) => Promise<void>;
    kakaoLogin: (accessToken: string) => Promise<void>;
    logout: () => Promise<void>;
    restoreSession: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);

    const restoreSession = async () => {
        try {
            setInitializing(true);
            const accessToken = await getAccessToken();
            const refreshToken = await getRefreshToken();
            if (!accessToken || !refreshToken) { setIsAuthenticated(false); return; }
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            setIsAuthenticated(true);
        } catch (error) {
            console.log("Restore Session Error", error);
            await removeTokens();
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setInitializing(false);
        }
    };

    useEffect(() => { restoreSession(); }, []);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            const response = await authService.login({ email, password });
            await saveTokens(response.accessToken, response.refreshToken);
            setUser(await authService.getCurrentUser());
            setIsAuthenticated(true);
        } catch (error) { console.log("Login Error", error); throw error; }
        finally { setLoading(false); }
    };

    const register = async (userName: string, email: string, userPhone: string, password: string) => {
        try {
            setLoading(true);
            const response = await authService.register({ userName, email, userPhone, password });
        } catch (error) { console.log("Register Error", error); throw error; }
        finally { setLoading(false); }
    };

    const googleLogin = async (idToken: string) => {
        try {
            setLoading(true);
            const response = await authService.googleLogin({ idToken });
            await saveTokens(response.accessToken, response.refreshToken);
            setUser(await authService.getCurrentUser());
            setIsAuthenticated(true);
        } catch (error) { console.log("Google Login Error", error); throw error; }
        finally { setLoading(false); }
    };

    const kakaoLogin = async (accessToken: string) => {
        try {
            setLoading(true);
            const response = await authService.kakaoLogin({ accessToken });
            await saveTokens(response.accessToken, response.refreshToken);
            setUser(await authService.getCurrentUser());
            setIsAuthenticated(true);
        } catch (error) { console.log("카카오 로그인 오류", error); throw error; }
        finally { setLoading(false); }
    };

    const logout = async () => {
        try { setLoading(true); await authService.logout(); }
        catch (error) { console.log("Logout Error", error); }
        finally {
            await removeTokens();
            setUser(null);
            setIsAuthenticated(false);
            setLoading(false);
        }
    };

    const refreshUser = useCallback(async () => {
        try { setUser(await authService.getCurrentUser()); }
        catch (error) { console.log("Refresh User Error", error); }
    }, []);

    return (
        <AuthContext.Provider value={{
            user, loading, initializing, isAuthenticated,
            login, googleLogin, kakaoLogin, register, logout, restoreSession, refreshUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider.");
    return context;
}