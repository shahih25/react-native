import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import LogoutScreen from "../screens/LogoutScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: "white" },
                tabBarActiveBackgroundColor: "gray",
                headerTitleAlign: "center",
                tabBarLabelStyle: {
                    color: "black",
                    fontWeight: "700"
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let color = focused ? "white" : "black";
                    return <Ionicons name={"home"} size={28} color={color} />
                }
            }} />
            <Tab.Screen name="Logout" component={LogoutScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let color = focused ? "white" : "black";
                    return <Ionicons name={"log-out"} size={28} color={color} />
                }
            }} />
        </Tab.Navigator>
    );
}

export default MyTabs;