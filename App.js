// import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwind-rn";
import { AuthProvider } from "./src/use-auth";

import utilities from "./tailwind.json";
// import CurrentStandings from "./src/screens/currentStandings";
// import Schedule from "./src/screens/schedule";
// import Login from "./src/screens/login";
import { AppNav } from "./src/components/appNav";

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <NavigationContainer>
          <AuthProvider>
            <AppNav />
          </AuthProvider>
        </NavigationContainer>
      </View>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
