import React,{ useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Linking, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useTailwind } from 'tailwind-rn';
import Icon from 'react-native-vector-icons/EvilIcons';

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true)

  const tailwind = useTailwind();

  const API_URL = 'http://ergast.com/api/f1/current.json';

  useEffect(() => {
    fetchSchedule();

    async function fetchSchedule() {
      try {
        const response = await axios.get(API_URL);
        const data = response.data.MRData.RaceTable.Races;
        setSchedule(data);
        setLoading(false)
      } catch (e) {
        console.log(e);
        setLoading(false)
      }
    }
  }, []);



  function renderItem({ item, index }) {
    const lastItem = index === schedule.length - 1;
    const formattedDate = new Date(item.date).toLocaleDateString()
    return (
        <React.Fragment>
        <View style={tailwind('flex-row justify-between items-center mb-4', !lastItem && 'border-b border-gray-300 pb-2')}>
          <View style={tailwind('w-10')}>
            <Text style={tailwind('text-gray-500')}>{item.round}</Text>
          </View>
          <View style={tailwind('flex-1 ml-2')}>
            <Text style={tailwind('text-sm font-bold')}>{item.raceName}</Text>
            <Text style={tailwind('text-sm text-gray-500')}>{item.Circuit.circuitName}</Text>
            <Text style={tailwind('text-gray-500')}>{formattedDate}</Text>
          </View>
          <View style={tailwind('w-14')}>
            <Icon name="external-link" size={20} color="blue" onPress={() => Linking.openURL(item.url)} />
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
          <Text style={tailwind('text-base font-bold')}>Race</Text>
        </View>
        <View style={tailwind('w-14')}>
          <Text style={tailwind('text-base font-bold')}>Wiki</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={tailwind('flex-1 py-5 px-2 bg-white')}>
      {loading ? ( // Display loading indicator while loading is true
        <ActivityIndicator size="large" color="#000" style={tailwind('flex-1 justify-center items-center')} />
      ) : (
        <FlatList
          data={schedule}
          keyExtractor={(item) => item.round.toString()}
          renderItem={renderItem}
          ListHeaderComponent={header}
          contentContainerStyle={tailwind('px-4')}
        />
      )}
    </View>
  );
}