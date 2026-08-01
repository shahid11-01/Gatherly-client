import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputFieldProps {
    label: string;
    placeholder: string;
    value:string;
    onChangeText: (text: string) => void;

    keyboardType?:
        | "default"
        | "email-address";



    //비밀번호 입력 여부
    secureTextEntry?: boolean;
}

//InputField 컴포넌트
//이메일과 비밀번호 입력창에서 공통으로 사용하는 컴포넌트이다
export default function InputField({
    label,
    placeholder,
    value,
    onChangeText,

    keyboardType = "default",

    //secureTextEntry가 true이면
    //입력한 문자를 ●●●● 형태로 숨긴다
    secureTextEntry = false,
}: InputFieldProps){

    return (
        <View>
            <Text style={styles.label}>
                {label}
            </Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
            />
        </View>
    );

}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
    },

    input: {
        borderWidth:1,
        borderColor: "#E2E8F0",
        borderRadius: 12,
        padding: 16,
    },
});

