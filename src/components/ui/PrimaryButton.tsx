import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/font";

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
}

export default function PrimaryButton({
    title,
    onPress,
}: PrimaryButtonProps) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        
        >
            <Text style={styles.text}>
                {title}
            </Text>
            
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    //버튼 스타일
    button: {
        width: "100%",
        height: 56,
        backgroundColor: Colors.light.primary,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center"
    },

    //버튼 텍스트
    text: {
        color: "#FFFFFF",
        fontSize: Fonts.body,
        fontWeight: "700",
    },
});