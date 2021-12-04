import { SafeAreaView, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { StackParamList } from '../../../app/Navigation.types';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

export const TrackDetailsScreen = (
  props: NativeStackScreenProps<StackParamList, 'TrackDetails'>,
) => {
  const track = props.route.params.track;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <Text>Dystans:</Text>
        <Text>{track.distance.toFixed(2)} km</Text>
      </View>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>Data:</Text>
        <Text>{new Date(track.timestamp).toLocaleDateString()}</Text>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={{
          latitude: track.path[0].latitude,
          longitude: track.path[0].longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Polyline coordinates={track.path} strokeColor="blue" strokeWidth={5} />
      </MapView>
    </SafeAreaView>
  );
};
