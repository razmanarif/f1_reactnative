import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import CurrentConstructorStandings from '../components/currentConstructorStandings';
import CurrentDriverStandings from '../components/currentDriverStandings';

export default function ({ activeTab, handleTabPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'drivers' && styles.activeTab]}
          onPress={() => handleTabPress('drivers')}
        >
          <Text style={styles.tabText}>DRIVERS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'constructors' && styles.activeTab]}
          onPress={() => handleTabPress('constructors')}
        >
          <Text style={styles.tabText}>TEAMS</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {activeTab === 'drivers' && <CurrentDriverStandings />}
        {activeTab === 'constructors' && <CurrentConstructorStandings />}
      </ScrollView>
    </View>
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

