import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import InputField from "./InputField";

//비밀번호 입력 컴포넌트

interface PasswordInputProps {
    value: string;
    onChangeText: (text: string) => void;
}

export default function PasswordInput({
    value,
    onChangeText,
}: PasswordInputProps) {

    // 비밀번호 표시 여부
    const [hidden, setHidden] = useState(true);

    return (
        <View>

            <InputField
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={hidden}
            />

            <Pressable
                style={styles.eyeButton}
                onPress={() => setHidden(!hidden)}
            >
                <Ionicons
                    name={hidden ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#64748B"
                />
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({

    // 비밀번호 보기 버튼
    eyeButton: {
        position: "absolute",
        right: 16,
        top: 42,
    },

});