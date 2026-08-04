import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "@/src/theme/colors";
import { MainTabParamList } from "@/src/types/navigation";

import CreateEvent from "@/src/screens/main/CreateEvent";
import HomeScreen from "@/src/screens/main/HomeScreen";
import MyEventsScreen from "@/src/screens/main/MyEventsScreen";
import ProfileScreen from "@/src/screens/main/ProfileScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

function CreateTabButton({ onPress }: any) {
    return (
        <TouchableOpacity style={styles.createWrap} activeOpacity={0.85} onPress={onPress}>
            <View style={styles.createCircle}>
                <Ionicons name="add" size={30} color="#fff" />
            </View>
        </TouchableOpacity>
    );
}

export default function BottomTabNavigator() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.light.primary,
                tabBarInactiveTintColor: "#94a3b8",
                tabBarStyle: {
                    height: 60 + insets.bottom,      
                    paddingBottom: insets.bottom + 4, 
                    paddingTop: 8,
                },
                tabBarLabelStyle: { fontSize: 11, marginTop: 2 },
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />

            <Tab.Screen name="MyEvents" component={MyEventsScreen}
                options={{
                    tabBarLabel: "My Events",
                    tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
                }} />

            <Tab.Screen name="Create" component={CreateEvent}
                options={{
                    tabBarButton: (props) => <CreateTabButton {...props} />,
                    tabBarLabel: () => null,   
                }} />

            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    createWrap: {
        top: -2,                 // lifts the circle above the bar
        justifyContent: "center",
        alignItems: "center",
    },
    createCircle: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: Colors.light.primary,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: Colors.light.primary,
        shadowOpacity: 0.35,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
});