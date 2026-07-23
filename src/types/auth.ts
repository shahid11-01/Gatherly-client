//로그인 응답
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    message: string;
}
//로그인 요청
export interface LoginRequest {
    email: string;
    password: string;
}
//회원가입 요청
export interface SignupRequest {
    userName: string;
    email: string;
    password: string;
}

//사용자
export interface User {
    userId:number;
    userName:string;
    email: string;
}