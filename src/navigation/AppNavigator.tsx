import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 화면
import EditEventScreen from "@/src/screens/event/EditEventScreen";
import EventDetailScreen from "@/src/screens/event/EventDetailScreen";
import MyEventDetailScreen from "../screens/main/MyEventDetailScreen";
import BottomTabNavigator from "./BottomTabNavigator";

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
                name="MainTabs"
                component={BottomTabNavigator}
            />

            <Stack.Screen
                name="EventDetail"
                component={EventDetailScreen}
            />
            <Stack.Screen
                name="EditEvent"
                component={EditEventScreen}
            />
            <Stack.Screen
                name="MyEventDetailScreen"
                component={MyEventDetailScreen}
            />


        </Stack.Navigator>

    );

}