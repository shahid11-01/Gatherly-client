import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/src/theme/colors";
import { Fonts } from "@/src/theme/font";
import { Spacing } from "@/src/theme/spacing";

// 구분선(Divider)
interface Dividerprops {
    text: string;
}

export default function Divider({
    text,
}: Dividerprops) {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.text}>
                {text}
            </Text>
            <View style={styles.line} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        alignItems:"center",
        marginVertical:Spacing.xl,  
    },
    line: {
        flex:1,
        height:1,
        backgroundColor: Colors.light.border,
    },

    text: {
        marginHorizontal: Spacing.md,
        fontSize: Fonts.body,
        color: Colors.light.textSecondary,

    },
});