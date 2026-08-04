import LoginHeader from "@/src/components/common/LoginHeader";
import Checkbox from "@/src/components/form/Checkbox";
import InputField from "@/src/components/form/InputField";
import PasswordInput from "@/src/components/form/PasswordInput";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import { useAuth } from "@/src/context/AuthContext";
import { useLanguage } from "@/src/context/LangaugeContext";
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

export default function RegisterScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const { register } = useAuth();
    const { t } = useLanguage();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [checked, setChecked] = useState(false);

    const handleRegister = async () => {
        const error = validateRegister(name, email, userPhone, password, checked);
        if (error) { alert(error); return; }

        try {
            await register(name, email, userPhone, password);
            alert(t.registerSuccess);            // ✅ success
            navigation.navigate("Login");        // ✅ go to login
        } catch (error: any) {
            // shows "이미 사용중인 이메일" (duplicate) or any backend message
            const msg = error?.response?.data?.message
                     ?? error?.response?.data
                     ?? t.registerFailed;
            alert(msg);
        }
    };

    const handleLogin = () => navigation.navigate("Login");

    return (
        <SafeAreaView style={styles.container}>
            <LoginHeader title={t.createAccount} subtitle={t.registerSubtitle} />

            <View style={styles.content}>
                <InputField
                    label={t.fullName}
                    placeholder={t.enterName}
                    value={name}
                    onChangeText={setName}
                />
                <InputField
                    label={t.email}
                    placeholder={t.enterEmail}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <InputField
                    label={t.phone ?? "Phone"}
                    placeholder="010-1234-5678"
                    value={userPhone}
                    onChangeText={setUserPhone}
                    keyboardType={"phone-pad" as any}
                />
                <PasswordInput value={password} onChangeText={setPassword} />
                <Checkbox
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    label={t.agreeTerms}
                />
                <PrimaryButton title={t.createAccount} onPress={handleRegister} />
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.bottomText}>{t.alreadyAccount}</Text>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.signInText}>{t.signIn}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.background },
    content: { flex: 1, padding: Spacing.lg },
    bottomContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", paddingBottom: Spacing.xl },
    bottomText: { fontSize: Fonts.body, color: Colors.light.textSecondary },
    signInText: { marginLeft: Spacing.xs, fontSize: Fonts.body, fontWeight: "700", color: Colors.light.primary },
});