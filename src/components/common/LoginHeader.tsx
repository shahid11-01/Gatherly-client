import { Images } from "@/src/constants/images";
import { Colors } from "@/src/theme/colors";
import { Fonts } from "@/src/theme/font";
import { Spacing } from "@/src/theme/spacing";
import { Image, StyleSheet, Text, View } from "react-native";

// 로그인 화면 상단(Header)
interface LoginHeaderProps {
    title: string;
    subtitle: string;
}

export default function LoginHeader ({
    title,
    subtitle,
}:LoginHeaderProps) {
    return (
        <View style={styles.container}>
            <Image
                source={Images.logo}
                style = {styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>
                {title}
            </Text>

            <Text style={styles.subtitle}>
                {subtitle}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    //로그인 화면 상단
    container: {

        backgroundColor: Colors.light.primary,

        paddingHorizontal: Spacing.lg,

        paddingTop: 70,

        paddingBottom: 45,

        borderBottomLeftRadius: 28,

        borderBottomRightRadius: 28,


    },

    logo : {
        width: 60,
        height:60,
        marginBottom: Spacing.lg,
    
    },

    title: {
        fontSize: Fonts.title,

        fontWeight: "700",

        color: "#FFFFFF",

        marginBottom: Spacing.sm,
    },
    //부제목

    subtitle: {

        fontSize: Fonts.body,

        color: "#E2E8F0",

    },

});