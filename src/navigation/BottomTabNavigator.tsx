import { Colors } from "@/src/theme/colors";
import { MainTabParamList } from "@/src/types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";

import CreateEvent from "@/src/screens/main/CreateEvent";
import HomeScreen from "@/src/screens/main/HomeScreen";
import MyEventScreen from "@/src/screens/main/MyEventScreen";
import ProfileScreen from "@/src/screens/main/ProfileScreen";


const Tab = createBottomTabNavigator<MainTabParamList>();

function CreateTabButton({children, onPress}: any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{top: 20, justifyContent:"center", alignItems: "center"}}
        >
            <View
                style={{
                    width:60,
                    height:60,
                    borderRadius: 30,
                    backgroundColor: Colors.light.primary,
                    justifyContent:"center",
                    alignItems:"center",
                    shadowColor:Colors.light.primary,
                    shadowOpacity: 0.3,
                    shadowRadius:8,
                    shadowOffset: {width:0, height: 4},
                    elevation: 5,
                }}
            >
                {children}
            </View>

        </TouchableOpacity>
    );
}

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown:false,
                tabBarActiveTintColor:Colors.light.primary,
                tabBarInactiveTintColor:"#94a3b8",
                tabBarStyle: {height:70, paddingBottom:12, paddingTop:8},
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon:({color, size}) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="MyEvents"
                component={MyEventScreen}
                options={{
                    tabBarLabel: "MyEvents",
                    tabBarIcon:({color, size}) => (
                        <Ionicons name="calendar-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Create"
                component={CreateEvent}
                options={{
                    tabBarButton: (props) => <CreateTabButton {...props} />,
                    tabBarIcon: () =>(
                        <Ionicons name="add" size={30} color="#ffffff" />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}