import { useAuth } from "@/src/context/AuthContext";
import {
    GoogleSignin,
    statusCodes,
} from "@react-native-google-signin/google-signin";

//구글 로그인 되면 브러우저를 끊기
GoogleSignin.configure({
    webClientId:"237759734403-s1jjqmlk7cc98iaa6v4hu9p9sp8qo37e.apps.googleusercontent.com",
    offlineAccess: false,
})

export function useGoogleLogin() {

    const {googleLogin} = useAuth();

    const signInWithGoogle  = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signOut();  //캐시를 지우기
            const userInfo = await GoogleSignin.signIn();
            const idToken = userInfo.data?.idToken;
            if(idToken) {
                googleLogin(idToken); //백앤드로 id token 보내기
            }
        }catch(e:any) {
            if (e.code === statusCodes.SIGN_IN_CANCELLED) return;
            console.log("Google sign-in error", e);
        }
    };
    return {signInWithGoogle };
    
}