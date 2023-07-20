import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from "../use-auth";
import MostRecentResults from "../screens/mostRecent";
import CurrentStandings from "../screens/currentStandings";
import Schedule from "../screens/schedule";
import Login from "../screens/login";
import Register from "../screens/register";
import Logout from "../screens/logout";

const AppStack = createNativeStackNavigator();

export function AppNav() {
  const authHook = useAuth();

  return (
    <AppStack.Navigator
    screenOptions={{
      headerShown: false,
      backgroundColor: "#FFA500",
    }}
  >
      {!authHook.isAuth ? (
        <>
          <AppStack.Screen name="Login" component={Login} />
          <AppStack.Screen name="Register" component={Register} />
        </>
      ) : (
        <AppStack.Screen name="Main" component={MainApp} />
      )}
    </AppStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Recent Race Results") {
            iconName = focused ? "list-circle" : "list-circle-outline";
          } else if (rn === "Current Standings") {
            iconName = focused ? "list" : "list-outline";
          } else if (rn === "Schedule") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (rn === "Log Out") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions ={{
        activeTintColor: "#FFA500",
        inactiveTintColor: "grey",
      }}
    >
      <Tab.Screen name="Recent Race Results" component={MostRecentResults} />
      <Tab.Screen name="Current Standings" component={CurrentStandings} />
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Log Out" component={Logout} />
    </Tab.Navigator>
  );
}
