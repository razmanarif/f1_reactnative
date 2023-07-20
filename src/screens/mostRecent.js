import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Linking } from 'react-native';
import axios from 'axios';
import { useTailwind } from 'tailwind-rn';
// import Icon from 'react-native-vector-icons/EvilIcons';

export default function MostRecentResults() {
    const [recentResults, setRecentResults] = useState([]);

    const tailwind = useTailwind ()

    const API_URL = 'http://ergast.com/api/f1/current/last/results.json';

    useEffect(() => {
        fetchRecentResults();

        async function fetchRecentResults() {
            try{
                const response = await axios.get(API_URL);
                const data = response.data.MRData.RaceTable.Races[0].Results
                setRecentResults(data);
            } catch (e) {
                console.log(e)
            }
        }
    }, []);

    function renderItem({ item, index }) {
        const lastItem = index === recentResults.length - 1;
        const statusColor = item.status ==='Finished' ? 'text-green-700' : 'text-gray-500'
        return (
          <React.Fragment>
            <View style={tailwind('flex-row justify-between items-center mb-4', !lastItem && 'border-b border-gray-300 pb-2')}>
              <View style={tailwind('w-10')}>
                <Text style={tailwind('text-gray-500')}>{item.position}</Text>
              </View>
              <View style={tailwind('flex-1 ml-2')}>
                <Text style={tailwind('text-sm font-bold')}>{item.Driver.givenName} {item.Driver.familyName}</Text>
                <Text style={tailwind('text-sm text-gray-500')}>{item.Constructor.name}</Text>
              </View>
              <View style={tailwind('w-14')}>
                <Text style={tailwind('text-gray-500')}>{item.laps}</Text>
              </View>
              <View style={tailwind('w-14 mr-5')}>
                <Text style={tailwind(statusColor)}>{item.status}</Text>
              </View>
              <View style={tailwind('w-14')}>
                <Text style={tailwind('text-gray-500')}>{item.FastestLap.Time.time}</Text>
                <Text style={tailwind('text-gray-500')}>Lap {item.FastestLap.lap}</Text>
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
              <Text style={tailwind('text-base font-bold')}>Laps</Text>
            </View>
            <View style={tailwind('w-14 mr-5')}>
              <Text style={tailwind('text-base font-bold')}>Status</Text>
            </View>
            <View style={tailwind('w-14 ')}>
              <Text style={tailwind('text-xs font-bold')}>Fastest Lap</Text>
            </View>
          </View>
        );
      }

      
  return (
    <View style={tailwind('flex-1 py-5 px-2 bg-white')}>
      {/* <Text style={tailwind('text-2xl font-bold mb-4 text-center')}>Current Driver Standings</Text> */}
      <FlatList
        data={recentResults}
        keyExtractor={(item) => item.position}
        renderItem={renderItem}
        ListHeaderComponent={header()}
        contentContainerStyle={tailwind('px-4')}
      />
    </View>
  );
}