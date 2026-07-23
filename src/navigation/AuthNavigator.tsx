// 인증(Auth) 관련 화면을 관리하는 Navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageScreen from '../screens/auth/LanguageScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/home/HomeScreen';


//인증 Stack 타입
export type AuthStackParamList = {
    Language: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();

//로그인 안 되는 상태
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

            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />

            </Stack.Navigator>
    );
}