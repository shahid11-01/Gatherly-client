import { SafeAreaView, StyleSheet, Text } from "react-native";

import { useAuth } from "@/src/context/AuthContext";
import { AuthStackParamList } from "@/src/navigation/AuthNavigator";
import { Colors } from "@/src/theme/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from 'react-native';


// 홈 화면
export default function HomeScreen() {
        useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

        const {user} = useAuth();
        const {logout} = useAuth();
        const handleLogout = async () => {
            try {
                await logout();
            }catch(error) {
                console.log("Logout Error", error);
            }
        };
    

    return (

        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>

                 Welcome to Gatherly 🎉,{"\n\n"}
                 {user?.userName} 님,  환영합니다!🌸{"\n"}
                 오늘도 Gatherly와 함께{"\n"}
                 소중한 추억을 만들어 보세요. 💕

            </Text>
             {/* 임시 로그아웃 버튼 */}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutText}>
                    Logout
                </Text>
            </TouchableOpacity>

        </SafeAreaView>

    );

}

const styles = StyleSheet.create({
    logoutButton: {
        marginTop: 30,
        backgroundColor: "#EF4444",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    logoutText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 16,

    },

    container: {

        flex: 1,

        justifyContent: "center",

        alignItems: "center",

        backgroundColor: Colors.light.background,

    },
    title: {
        fontSize:28,
        fontWeight:"700",
    },

});