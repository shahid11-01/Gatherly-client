import LoginHeader from "@/src/components/common/LoginHeader";
import Checkbox from "@/src/components/form/Checkbox";
import InputField from "@/src/components/form/InputField";
import PasswordInput from "@/src/components/form/PasswordInput";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import { useAuth } from "@/src/context/AuthContext";
import { Colors } from "@/src/theme/colors";
import { Fonts } from "@/src/theme/font";
import { Spacing } from "@/src/theme/spacing";
import { AuthStackParamList } from "@/src/types/navigation";
import { validateRegister } from "@/src/utils/validation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



//회원가입 화면
export default function RegisterScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
        //입력 상태
        const[name, setName] = useState("");
        const[email, setEmail] = useState("");
        const[password, setPassword] = useState("");
        const {register} = useAuth();

        //약관 동의 여부
        const[checked, setChecked] = useState(false);


        //회원가입 버튼 클릭
        const handleRegister = async () => {

            const error = validateRegister(
                name,
                email,
                password,
                checked,
            );

            if (error) {
                alert(error);
                return;
            }

            try {
                await register(
                    name,
                    email,
                    password,
                );

            } catch (error) {

                console.log("Register Error", error);

            }

        };
        //로그인 화면 이동
        const handleLogin = () => {
            navigation.navigate("Login");

        };
        
    
        return (
            <SafeAreaView style={styles.container}>
                {/*상단 헤더 */}
                <LoginHeader
                    title="Create Account"
                    subtitle="Join thounsands of even lover"
                />
                {/*입력 영역 */}
                <View style = {styles.content}>
                    <InputField
                        label="Full Name"
                        placeholder="Maya Johnson"
                        value={name}
                        onChangeText={setName}
                    />
                    <InputField
                        label="Email Address"
                        placeholder="hello@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <PasswordInput
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Checkbox
                        checked={checked}
                        onPress={() => setChecked(!checked)}
                        label="I agree to the Terms of Service and Privacy Policy"
                    />
                    <PrimaryButton
                    title="Create Account"
                    onPress={handleRegister}
                    />
                </View>
                {/*하단 로그인 이동 */}
                <View style ={styles.bottomContainer}>
                    <Text style={styles.bottomText}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={handleLogin}
                    >
                        <Text style={styles.signInText}>
                            Sign In
                        </Text>
                    </TouchableOpacity>

                </View>

            </SafeAreaView>
        );
}
    const styles = StyleSheet.create({

        //화면 전체
        container: {
            flex:1,
            backgroundColor: Colors.light.background,
        },

        //입력 영역
        content: {
            flex:1,
            padding: Spacing.lg,

        },
        //하단 로그인 이동 영역
        bottomContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: Spacing.xl,
        },
        //제목
        title: {
            fontSize: 28,
            fontWeight:"700",

        },
        //안내 문구
        bottomText: {
            fontSize: Fonts.body,
            color: Colors.light.textSecondary,
        },
         // 로그인 이동 버튼
        signInText: {
            marginLeft: Spacing.xs,
            fontSize: Fonts.body,
            fontWeight: "700",
            color: Colors.light.primary,
        },

    });

