import { Colors } from "@/src/theme/colors";
import { Fonts } from "@/src/theme/font";
import { Spacing } from "@/src/theme/spacing";
import { Image, Pressable, StyleSheet, Text } from "react-native";

interface SocialButtonProps {
    title: string;
    //버튼 아이콘
    icon: any;
    //버튼 클릭 이벤트
    onPress: () => void;
    disabled?: boolean;
}

export default function SocialButton({
    title,
    icon,
    onPress,
    disabled =false,
}: SocialButtonProps) {
    return(

        <Pressable
            style={styles.container}
            onPress={onPress}
            
            
        >
            <Image
                source={icon}
                style={styles.icon}
                resizeMode="contain"
            />

            <Text style={styles.title}>
                {title}
            </Text>


        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",

        alignItems:"center",

        flex: 1,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 14,
        paddingVertical: 14,
        backgroundColor: Colors.light.surface,
    },

    icon: {
        width: 27,
        height: 27,
        marginRight: Spacing.sm,
    },

    title: {
        fontSize: Fonts.body,
        color: Colors.light.text,
        fontWeight: "600",
    },
});


