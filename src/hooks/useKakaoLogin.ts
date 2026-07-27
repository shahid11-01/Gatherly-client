import { useAuth } from "@/src/context/AuthContext";
import { login as kakaoSdkLogin } from "@react-native-seoul/kakao-login";

export function useKakaoLogin() {
    const {kakaoLogin} = useAuth();

    const signInWithKakao = async () => {
        try {
            const token = await kakaoSdkLogin();
            if(token.accessToken) {
                await kakaoLogin(token.accessToken); //authService -> backend
            }
        }catch(e) {
            console.log("카카오 로그인 오류", e);
        }
    };
    return {signInWithKakao};
}