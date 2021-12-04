import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import { Colors } from '../../../theme/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { DrawerStackParamList } from '../../../app/Navigation.types';
import { TracksContext } from '../TracksContext';

export const TracksScreen = ({
  navigation,
}: NativeStackScreenProps<DrawerStackParamList, 'Tracks'>) => {
  const { tracks } = useContext(TracksContext);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text>Trasy</Text>
      <FlatList
        data={tracks}
        renderItem={({ item }) => {
          const date = new Date(item.timestamp);
          const dateString = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
          return (
            <TouchableOpacity
              onPress={() =>
                // @ts-ignore
                navigation.navigate('TrackDetails', { track: item })
              }>
              <View
                style={{
                  padding: 10,
                  marginVertical: 10,
                  borderRadius: 5,
                  borderColor: Colors.lightGray,
                  borderWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFF',
                }}>
                <View
                  style={{
                    paddingRight: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon name="calendar" size={20} color={Colors.darkGray} />
                  <Text style={{ marginLeft: 8 }}>{dateString}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: Colors.darkGray,
                      fontSize: 20,
                    }}>
                    {item.distance.toFixed(0)} km
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={t => String(t.id)}
      />
    </SafeAreaView>
  );
};
