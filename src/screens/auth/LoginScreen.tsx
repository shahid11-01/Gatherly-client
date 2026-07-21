import { SafeAreaView, StyleSheet, Text } from "react-native";

//로그인 화면

export default function LoginScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.container}>
                Login Screen
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
    //제못
    title: {
        fontSize:28,
        fontWeight:"700",
    },
});