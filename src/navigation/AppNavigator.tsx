import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 화면
import HomeScreen from "@/src/screens/main/HomeScreen";

const Stack = createNativeStackNavigator();

// 로그인 이후 화면
export default function AppNavigator() {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >

            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />

        </Stack.Navigator>

    );

}