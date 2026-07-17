import api from "../api/axios";
import { AuthResponse, LoginRequest, SignupRequest, } from "../types/auth";

//로그인
export const login = async(
    data: LoginRequest
): Promise<AuthResponse> => {
    const response = await api.post("/api/auth/signin", data
        
    );
    return response.data;

};

//회원가입
export const signup = async(
    data: SignupRequest
    
): Promise<AuthResponse> => {
    const response = await api.post("/api/auth/signup", data);
    return response.data;
}




