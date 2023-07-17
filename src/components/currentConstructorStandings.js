import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Linking } from 'react-native';
import axios from 'axios';
import { useTailwind } from 'tailwind-rn';
import Icon from 'react-native-vector-icons/EvilIcons';

export default function CurrentConstructorStandings() {
  const [constructorStandings, setConstructorStandings] = useState([]);

  const tailwind = useTailwind();

  const API_URL = 'http://ergast.com/api/f1';

  useEffect(() => {
    fetchConstructorStandings();
  }, []);

  async function fetchConstructorStandings() {
    try {
      const response = await axios.get(`${API_URL}/current/constructorStandings.json`);
      const data = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      setConstructorStandings(data);
    } catch (e) {
      console.log(e);
    }
  }

  function renderItem({ item, index }) {
    const lastItem = index === constructorStandings.length -1;
    return (
      <React.Fragment>
      <View style={tailwind('flex-row justify-between items-center mb-4', !lastItem && 'border-b border-gray-300 pb-2')}>
        <View style={tailwind('w-10')}>
          <Text style={tailwind('text-gray-500')}>
           {item.position}
          </Text>
        </View>
        <View style={tailwind('flex-1 ml-2')}>
          <Text style={tailwind('text-base font-bold')}>
            {item.Constructor.name}
          </Text>
        </View>
        <View style={tailwind('w-14')}>
          <Text style={tailwind('text-gray-500')}>{item.wins}</Text>
        </View>
        <View style={tailwind('w-14')}>
          <Text style={tailwind('text-gray-500')}>{item.points}</Text>
        </View>
        <View style={tailwind('w-14')}>
            <Icon name="external-link" size={20} color="blue" onPress={() => Linking.openURL(item.Constructor.url)} />
          </View>
      </View>
      {!lastItem && <View style={tailwind('h-px bg-gray-300 my-2')} />}
      </React.Fragment>
    );
  }

  function header () {
    return(
      <View style={tailwind('flex-row justify-between items-center mb-4')}>
      <View style={tailwind('w-10')}>
        <Text style={tailwind('text-base font-bold')}>No.</Text>
      </View>
      <View style={tailwind('flex-1')}>
        <Text style={tailwind('text-base font-bold')}>Team</Text>
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
    )
  }
  

  return (
    <SafeAreaView style={tailwind('flex-1 p-4 bg-white')}>
      {/* <Text style={tailwind('text-xl font-bold mb-4 text-center')}>Current Constructor Standings</Text> */}
      <FlatList
        data={constructorStandings}
        keyExtractor={(item) => item.position}
        renderItem={renderItem}
        ListHeaderComponent={header()}
        contentContainerStyle={tailwind('px-4')}
      />
    </SafeAreaView>
  );
}
