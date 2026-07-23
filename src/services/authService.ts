import api from "../api/axios";
import { AuthResponse, LoginRequest, SignupRequest, User } from "../types/auth";

//요청 타입

//로그인
export async function login(
    data: LoginRequest
): Promise<AuthResponse> {
    const response = await api.post("/auth/signin", data,
        
    );
    return response.data;

};

//회원가입
export async function register(
    data: SignupRequest
    
): Promise<AuthResponse> {
    console.log("Login Request:", data);
    const response = await api.post<AuthResponse>(
        "/auth/signup",
        data,
    );
    console.log("Login Response:", response.data);
    return response.data;

}

//로그아웃
export async function logout(): Promise<void> {
    await api.post("/auth/logout");
}

//현재 로그인한 사용자 조회
export async function getCurrentUser():Promise<User> {
    const response = await api.get<User>(
        "/auth/user/me",
    );
    return response.data;
}
//AccessToken 재발급
export async function refreshToken(refreshToken: string,
):Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
        "/auth/refresh",
        {
        refreshToken,
    },
    );
    return response.data;
}

