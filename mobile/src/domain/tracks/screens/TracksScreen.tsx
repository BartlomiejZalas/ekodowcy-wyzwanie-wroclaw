import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../../theme/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { DrawerStackParamList } from '../../../app/Navigation.types';
import { TracksContext } from '../TracksContext';
import { ScreenContainer } from '../../../theme/components/ScreenContainer';
import { ScreenTitle } from '../../../theme/components/ScreenTitle';
import { AsyncStatus } from '../../../api/types';
import { Error } from '../../../theme/components/Error';
import { format } from 'date-fns';

export const TracksScreen = ({
  navigation,
}: NativeStackScreenProps<DrawerStackParamList, 'Tracks'>) => {
  const { tracks, getTracks } = useContext(TracksContext);
  const [status, setStatus] = useState(AsyncStatus.LOADING);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setStatus(AsyncStatus.LOADING);
        await getTracks();
        setStatus(AsyncStatus.LOADED);
      } catch (e) {
        setStatus(AsyncStatus.ERROR);
      }
    };
    fetchTracks();
  }, []);

  if (status === AsyncStatus.ERROR) {
    return <Error />;
  }

  if (status === AsyncStatus.LOADING) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ScreenContainer>
      <ScreenTitle text="Trasy" />
      <FlatList
        data={tracks}
        renderItem={({ item }) => {
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
                  <Text style={{ marginLeft: 8 }}>
                    {format(new Date(item.startTimestamp), 'HH:mm dd-MM-yyyy')}
                  </Text>
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
    </ScreenContainer>
  );
};
