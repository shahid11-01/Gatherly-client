import { SafeAreaView, StyleSheet, Text } from "react-native";


//회원가입 화면
export default function RegisterScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Register Screen
            </Text>
        </SafeAreaView>
    );
}
    const styles = StyleSheet.create({

        //화면 전체
        container: {
            flex:1,
            justifyContent: "center",
            alignItems: "center",
        },
        //제목
        title: {
            fontSize: 28,
            fontWeight:"700",

        },

    });

