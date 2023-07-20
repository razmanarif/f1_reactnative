import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CurrentConstructorStandings from '../components/currentConstructorStandings';
import CurrentDriverStandings from '../components/currentDriverStandings';

const Tab = createMaterialTopTabNavigator();

export default function CurrentStandings () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="drivers" component={CurrentDriverStandings} />
      <Tab.Screen name="constructors" component={CurrentConstructorStandings} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomColor: 'red',
  },
  tabText: {
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

