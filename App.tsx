import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { useLanguage } from "./src/context/LangaugeContext";
import AuthNavigator from "./src/navigation/AuthNavigator";

//앱의 시작 컴포넌트
export default function App() {
    const {loading} = useLanguage();
   if (loading) {
    return (
        <View
            style={{
                flex:1,
                justifyContent: "center",
                alignItems:"center",
            }}
        >
            <ActivityIndicator size="large" />

        </View>
    )
   }
   return (
        <NavigationContainer>
            <AuthNavigator/>
        </NavigationContainer>
   )
}