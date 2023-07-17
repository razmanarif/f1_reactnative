import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { TailwindProvider } from 'tailwind-rn';

import utilities from './tailwind.json';
import CurrentStandings from './src/screens/currentStandings';

export default function App() {
  const [activeTab, setActiveTab] = useState('drivers');

  function handleTabPress(tab) {
    setActiveTab(tab);
  }

  return (
    <TailwindProvider utilities={utilities}>
      <View style={styles.container}>
        <CurrentStandings activeTab={activeTab} handleTabPress={handleTabPress} />
        <StatusBar style="auto" />
      </View>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
