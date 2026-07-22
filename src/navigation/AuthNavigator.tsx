// 인증(Auth) 관련 화면을 관리하는 Navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageScreen from '../screens/auth/LanguageScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';


//인증 Stack 타입
export type AuthStackParamList = {
    Language: undefined;
    Login: undefined;
    Register: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();


export default function AuthNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Language"
                component={LanguageScreen}
            />

            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />

            <Stack.Screen
                name="Register"
                component={RegisterScreen}
            />

            </Stack.Navigator>
    );
}