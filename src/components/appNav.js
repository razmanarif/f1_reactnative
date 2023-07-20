import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTailwind } from "tailwind-rn";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../use-auth";
import MostRecentResults from "../screens/mostRecent";
import CurrentStandings from "../screens/currentStandings";
import Schedule from "../screens/schedule";
import Login from "../screens/login";
import Register from "../screens/register";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Logout from "../screens/logout";

const AppStack = createNativeStackNavigator();

export function AppNav() {
  const authHook = useAuth();

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {!authHook.isAuth ? (<>
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
    <Tab.Navigator>
      <Tab.Screen name="Recent Race Results" component={MostRecentResults} />
      <Tab.Screen name="Current Standings" component={CurrentStandings} />
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Log Out" component={Logout} />
    </Tab.Navigator>
  );
}


