import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ThankScreen from "../screens/ThankScreen";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: { backgroundColor: "white" }
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Thanks" component={ThankScreen} />
        </Tab.Navigator>
    );
}

export default MyTabs;