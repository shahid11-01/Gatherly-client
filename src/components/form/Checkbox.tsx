import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/src/theme/colors";
import { Spacing } from "@/src/theme/spacing";

//체크박스 props
interface CheckboxProps {
    //체크 여부
    checked:boolean;

    //체크 상태 변경 함수
    onPress:() => void;

    //체크박스 옆 텍스트
    label: string;
}
export default function Checkbox({
    checked,
    onPress,
    label,
}: CheckboxProps) {
    return(
        <Pressable
            style={styles.container}
            onPress={onPress}
        >
            <View
               style={[
                    styles.checkbox,
                    checked && styles.checked,
               ]}
            >
                {checked && (
                    <Ionicons
                        name="checkmark"
                        size={16}
                        color="white"
                    />
                )}
            </View>
            <Text style={styles.label}>
                {label}
            </Text>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    //체크박스 전체

    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: Spacing.lg,
    },
    //체크박스
    checkbox : {
         width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.light.primary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: Spacing.sm,
    },
     // 체크된 상태
    checked: {
        backgroundColor: Colors.light.primary,
    },

    // 라벨
    label: {
        flex: 1,
    },

});