import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Linking, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useTailwind } from 'tailwind-rn';
import Icon from 'react-native-vector-icons/EvilIcons';

export default function CurrentDriverStandings() {
  const [driverStandings, setDriverStandings] = useState([]);
  const [loading, setLoading] = useState(true)

  const tailwind = useTailwind();

  const API_URL = 'http://ergast.com/api/f1';

  useEffect(() => {
    fetchDriverStandings();

    async function fetchDriverStandings() {
      try {
        const response = await axios.get(`${API_URL}/current/driverStandings.json`);
        const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        setDriverStandings(data);
        setLoading(false)
      } catch (e) {
        console.log(e);
        setLoading(false)
      }
    }
  }, []);

  function renderItem({ item, index }) {
    const lastItem = index === driverStandings.length - 1;
    return (
      <React.Fragment>
        <View style={tailwind('flex-row justify-between items-center mb-4', !lastItem && 'border-b border-gray-300 pb-2')}>
          <View style={tailwind('w-10')}>
            <Text style={tailwind('text-gray-500')}>{item.position}</Text>
          </View>
          <View style={tailwind('flex-1 ml-2')}>
            <Text style={tailwind('text-sm font-bold')}>{item.Driver.givenName} {item.Driver.familyName}</Text>
            <Text style={tailwind('text-sm text-gray-500')}>{item.Constructors[0].name}</Text>
          </View>
          <View style={tailwind('w-14')}>
            <Text style={tailwind('text-gray-500')}>{item.wins}</Text>
          </View>
          <View style={tailwind('w-14')}>
            <Text style={tailwind('text-gray-500')}>{item.points}</Text>
          </View>
          <View style={tailwind('w-14')}>
            <Icon name="external-link" size={20} color="blue" onPress={() => Linking.openURL(item.Driver.url)} />
          </View>
        </View>
        {!lastItem && <View style={tailwind('h-px bg-gray-300 my-2')} />}
      </React.Fragment>
    );
  }

  function header() {
    return (
      <View style={tailwind('flex-row justify-between items-center mb-4')}>
        <View style={tailwind('w-10')}>
          <Text style={tailwind('text-base font-bold')}>No.</Text>
        </View>
        <View style={tailwind('flex-1')}>
          <Text style={tailwind('text-base font-bold')}>Name</Text>
        </View>
        <View style={tailwind('w-14')}>
          <Text style={tailwind('text-base font-bold')}>Wins</Text>
        </View>
        <View style={tailwind('w-14')}>
          <Text style={tailwind('text-base font-bold')}>Points</Text>
        </View>
        <View style={tailwind('w-14')}>
          <Text style={tailwind('text-base font-bold')}>Wiki</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={tailwind('flex-1 py-5 px-2 bg-white')}>
      {/* <Text style={tailwind('text-2xl font-bold mb-4 text-center')}>Current Driver Standings</Text> */}
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={tailwind('flex-1 justify-center items-center')} />
      ) : (
        <FlatList
          data={driverStandings}
          keyExtractor={(item) => item.position}
          renderItem={renderItem}
          ListHeaderComponent={header()}
          contentContainerStyle={tailwind('px-4')}
        />
      )}
    </View>
  );
}
