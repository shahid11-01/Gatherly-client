import { useState } from "react";

import LoginHeader from "@/src/components/common/LoginHeader";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import InputField from "@/src/components/form/InputField";
import PasswordInput from "@/src/components/form/PasswordInput";
import Divider from "@/src/components/ui/Divider";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import SocialButton from "@/src/components/ui/SocialButton";
import { Images } from "@/src/constants/images";
import { useAuth } from "@/src/context/AuthContext";
import { useLanguage } from "@/src/context/LangaugeContext";
import { useGoogleLogin } from "@/src/hooks/useGoogleLogin";
import { useKakaoLogin } from "@/src/hooks/useKakaoLogin";
import { AuthStackParamList } from "@/src/navigation/AuthNavigator";
import { Colors } from "@/src/theme/colors";
import { Spacing } from "@/src/theme/spacing";
import { validateLogin } from "@/src/utils/validation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// 로그인 화면
export default function LoginScreen() {
    
    const { t } = useLanguage();
    const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    // 이메일 상태
    const [email, setEmail] = useState("");

    // 비밀번호 상태
    const [password, setPassword] = useState("");
    const{login} =useAuth();
    const { signInWithGoogle,} = useGoogleLogin();
    const {signInWithKakao,} = useKakaoLogin();
    console.log("Email =", email);
    console.log("Password=", password);
    const handleLogin = async () => {
        const error = validateLogin(
            email,
            password,
        );
        if (error) {
            alert(error);
            return;
        }
        try {
            await login(
                email,
                password,
            );
        }catch (error) {
            console.log("Login Error", error);
        };
    }
    const handleRegister = () => {
        navigation.navigate("Register");
    }
    return (
        <SafeAreaView style={styles.container}>

            {/* 로그인 상단 헤더 */}
            <LoginHeader
                title={t.welcomeBack}
                subtitle={t.signInSubtitle}
            />

            {/* 로그인 입력 영역 */}
            <View style={styles.content}>

                <InputField
                    label={t.email}
                    placeholder={t.enterEmail}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <PasswordInput
                    value={password}
                    onChangeText={setPassword}
                />

                {/* 비밀번호 찾기 */}
                <TouchableOpacity style={styles.forgotContainer}>
                    <Text style={styles.forgotText}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>
                
                 <PrimaryButton
                    title="Login"
                    onPress={handleLogin}
              />
            </View>
            <Divider
                text="or Continue with"
            />

            <View style={styles.socialContainer}>
                <SocialButton
                    title="Kakao"
                    icon={Images.kakao}
                    onPress={signInWithKakao} 
                />

                <View style={{width: Spacing.md}}/>

                <SocialButton
                    title="Google"
                    icon={Images.google}
                    onPress={signInWithGoogle}
                />

            </View>
            <View style={styles.bottomContainer}>

                <Text style={styles.bottomText}>
                    Don't have an account?
                </Text>

                <TouchableOpacity onPress={handleRegister}>

                    <Text style={styles.signUpText}>
                        Sign Up
                    </Text>

                </TouchableOpacity>
                

            </View>
            

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    // 화면 전체
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },

    // 입력 영역
    content: {
        padding: Spacing.lg,
    },
    //비밀번호 찾기
    forgotContainer: {
        alignSelf: "flex-end",
        marginTop: Spacing.sm,
        marginBottom: Spacing.lg,
    },
    forgotText: {
        color: Colors.light.primary,
    },
    //소셜 로그인
    socialContainer: {
          flexDirection: "row",
          marginTop: Spacing.md,
    },
    // 회원가입
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: Spacing.xl,
    },

    bottomText: {
        color: Colors.light.textSecondary,
    },

    signUpText: {
        color: Colors.light.primary,
        fontWeight: "700",
        marginLeft: Spacing.xs,
    },

});