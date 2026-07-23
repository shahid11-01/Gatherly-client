import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const {
        isAuthenticated,
        loading,
    } = useAuth();
    // 초기 로딩
    if (loading) {

        return null;

    }

      return (

        <NavigationContainer>

            {

                isAuthenticated

                    ? <AppNavigator />

                    : <AuthNavigator />

            }

        </NavigationContainer>

    );

}