import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CurrentConstructorStandings from '../components/currentConstructorStandings';
import CurrentDriverStandings from '../components/currentDriverStandings';

const Tab = createMaterialTopTabNavigator();

export default function CurrentStandings () {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#808080",
        tabBarIndicatorStyle: {
          backgroundColor: "#FF0000",
        },
      }}
    >
      <Tab.Screen name="drivers" component={CurrentDriverStandings} />
      <Tab.Screen name="constructors" component={CurrentConstructorStandings} />
    </Tab.Navigator>
  );
};


