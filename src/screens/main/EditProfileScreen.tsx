import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/src/context/AuthContext";
import * as userService from "@/src/services/userService";
import { Colors } from "@/src/theme/colors";
import { Spacing } from "@/src/theme/spacing";

export default function EditProfileScreen() {
    const navigation = useNavigation();
    const { user, refreshUser } = useAuth();

    const [userName, setUserName] = useState(user?.userName ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [userPhone, setUserPhone] = useState((user as any)?.userPhone ?? "");
    const [photo, setPhoto] = useState<string | null>((user as any)?.profileImageUrl ?? null);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isLocal = user?.provider === "LOCAL";


    const pickPhoto = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"], quality: 0.8 });
        if (res.canceled) return;
        try {
            const url = await userService.uploadProfileImage(res.assets[0].uri);
            setPhoto(url);
            alert("사진이 변경되었습니다");
            await refreshUser();
        } catch (e) { console.log(e); alert("사진 업로드 실패"); }
    };

    const handleSave = async () => {
        if (!userName || !email) { alert("이름과 이메일은 필수입니다"); return; }
        try {
            await userService.updateUser({ userName, email, userPhone });
            await refreshUser();
            alert("정보가 수정되었습니다");
            navigation.goBack();
        } catch (e: any) { console.log(e); alert(e?.response?.data.message ?? e?.response?.data?? "수정 실패"); }
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword) { alert("비밀번호를 입력하세요"); return; }
        if (newPassword !== confirmPassword) { alert("새 비밀번호가 일치하지 않습니다"); return; }
        try {
            await userService.changePassword({ currentPassword, newPassword });
            alert("비밀번호가 변경되었습니다");
            setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
        } catch (e: any) { console.log(e); alert(e?.response?.data.message ?? e?.response?.data ?? "비밀번호 변경 실패"); }
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView contentContainerStyle={{ padding: Spacing.lg }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={22} color="#0f172a" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Edit Profile</Text>
                    <View style={{ width: 22 }} />
                </View>

                {/* Photo */}
                <View style={styles.photoWrap}>
                    {photo
                        ? <Image source={{ uri: photo }} style={styles.avatar} />
                        : <View style={[styles.avatar, styles.avatarPlaceholder]}>
                            <Ionicons name="person" size={36} color="#94a3b8" />
                          </View>}
                    <TouchableOpacity style={styles.cameraBtn} onPress={pickPhoto}>
                        <Ionicons name="camera" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.changePhoto} onPress={pickPhoto}>Change Photo</Text>

                {/* Fields */}
                <Text style={styles.label}>Full Name</Text>
                <TextInput style={styles.input} value={userName} onChangeText={setUserName} placeholder="Full name" />

                <Text style={styles.label}>Email</Text>
                <TextInput editable={isLocal} style={styles.input} value={email} onChangeText={setEmail}
                    keyboardType="email-address" autoCapitalize="none" placeholder="Email" />

                <Text style={styles.label}>Phone</Text>
                <TextInput style={styles.input} value={userPhone} onChangeText={setUserPhone}
                    keyboardType="phone-pad" placeholder="010-1234-5678" />

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveText}>Save Changes</Text>
                </TouchableOpacity>

                {/* Password section */}
                {isLocal && (
                    <>
                         <Text style={styles.section}>Change Password</Text>
                        <TextInput style={styles.input} value={currentPassword} onChangeText={setCurrentPassword}
                            secureTextEntry placeholder="Current password" />
                        <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword}
                            secureTextEntry placeholder="New password" />
                        <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword}
                            secureTextEntry placeholder="Confirm new password" />
                        <TouchableOpacity style={[styles.saveBtn, styles.pwBtn]} onPress={handleChangePassword}>
                            <Text style={styles.saveText}>Update Password</Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.background },
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: Spacing.lg },
    headerTitle: { fontSize: 18, fontWeight: "800" },
    photoWrap: { alignSelf: "center", marginTop: 8 },
    avatar: { width: 90, height: 90, borderRadius: 45 },
    avatarPlaceholder: { backgroundColor: "#e2e8f0", justifyContent: "center", alignItems: "center" },
    cameraBtn: { position: "absolute", right: 0, bottom: 0, backgroundColor: Colors.light.primary, borderRadius: 14, padding: 6 },
    changePhoto: { color: Colors.light.primary, fontWeight: "700", textAlign: "center", marginTop: 8, marginBottom: Spacing.lg },
    label: { fontWeight: "700", marginTop: Spacing.md, marginBottom: 6 },
    input: { borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 10, padding: 12, backgroundColor: "#f8fafc", marginBottom: 4 },
    saveBtn: { backgroundColor: Colors.light.primary, borderRadius: 12, padding: 16, alignItems: "center", marginTop: Spacing.lg },
    pwBtn: { backgroundColor: "#0f172a" },
    saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },
    section: { fontSize: 16, fontWeight: "800", marginTop: Spacing.xl, marginBottom: 8 },
});