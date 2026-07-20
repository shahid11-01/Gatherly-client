// 인증(Auth) 관련 화면을 관리하는 Navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageScreen from '../screens/auth/LanguageScreen';


const Stack = createNativeStackNavigator();

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


            </Stack.Navigator>
    );
}