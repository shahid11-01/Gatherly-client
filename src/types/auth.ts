export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    message: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    userName: string;
    email: string;
    password: string;
}