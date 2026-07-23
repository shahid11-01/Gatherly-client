import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

// 인증 API
import * as authService from "@/src/services/authService";

// Token 저장소
import {
    getAccessToken,
    getRefreshToken,
    removeTokens,
    saveTokens,
} from "@/src/utils/tokenStorage";

// 타입
import { User } from "@/src/types/auth";

// Context 타입
interface AuthContextType {

    // 로그인 여부
    isAuthenticated: boolean;

    // 사용자 정보
    user: User | null;

    // 초기 로딩
    loading: boolean;

    // 로그인
    login: (
        email: string,
        password: string,
    ) => Promise<void>;

    // 회원가입
    register: (
        userName: string,
        email: string,
        password: string,
    ) => Promise<void>;

    // 로그아웃
    logout: () => Promise<void>;

    // 세션 복원
    restoreSession: () => Promise<void>;
}

// Context 생성
const AuthContext =
    createContext<AuthContextType | null>(null);

// Provider Props
interface Props {

    children: ReactNode;

}

// Provider
export function AuthProvider({

    children,

}: Props) {

    // 사용자
    const [user, setUser] =
        useState<User | null>(null);

    // 로그인 여부
    const [
        isAuthenticated,
        setIsAuthenticated,
    ] = useState(false);

    // 초기 로딩
    const [
        loading,
        setLoading,
    ] = useState(true);

    // 저장된 로그인 복원
    const restoreSession = async () => {

        try {

            setLoading(true);

            const accessToken =
                await getAccessToken();

            const refreshToken =
                await getRefreshToken();

            if (!accessToken || !refreshToken) {

                setIsAuthenticated(false);

                return;

            }

            const currentUser =
                await authService.getCurrentUser();

            setUser(currentUser);

            setIsAuthenticated(true);

        }

        catch (error) {

            console.log(
                "Restore Session Error",
                error,
            );

            await removeTokens();

            setUser(null);

            setIsAuthenticated(false);

        }

        finally {

            setLoading(false);

        }

    };

    // 앱 시작 시 실행
    useEffect(() => {

        restoreSession();

    }, []);

    // 로그인
    const login = async (

        email: string,

        password: string,

    ) => {

        try {

            setLoading(true);

            const response =
                await authService.login({

                    email,

                    password,

                });

            await saveTokens(

                response.accessToken,

                response.refreshToken,

            );

            const currentUser =
                await authService.getCurrentUser();

            setUser(currentUser);

            setIsAuthenticated(true);

        }

        catch (error) {

            console.log(
                "Login Error",
                error,
            );

            throw error;

        }

        finally {

            setLoading(false);

        }

    };

    // 회원가입
    const register = async (

        userName: string,

        email: string,

        password: string,

    ) => {

        try {

            setLoading(true);

            const response =
                await authService.register({

                    userName,

                    email,

                    password,

                });

            await saveTokens(

                response.accessToken,

                response.refreshToken,

            );

            const currentUser =
                await authService.getCurrentUser();

            setUser(currentUser);

            setIsAuthenticated(true);

        }

        catch (error) {

            console.log(
                "Register Error",
                error,
            );

            throw error;

        }

        finally {

            setLoading(false);

        }

    };

    // 로그아웃
    const logout = async () => {

        try {

            setLoading(true);

            await authService.logout();

        }

        catch (error) {

            console.log(
                "Logout Error",
                error,
            );

        }

        finally {

            await removeTokens();

            setUser(null);

            setIsAuthenticated(false);

            setLoading(false);

        }

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                isAuthenticated,

                login,

                register,

                logout,

                restoreSession,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

// Context Hook
export function useAuth() {

    const context =
        useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider."
        );

    }

    return context;

}