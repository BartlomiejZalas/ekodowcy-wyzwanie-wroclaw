import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { StackParamList } from '../../../app/Navigation.types';
import { Button, SafeAreaView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../theme/Colors';
import React from 'react';

export const TrackFinishedScreen = ({
  navigation,
}: NativeStackScreenProps<StackParamList, 'TrackStop'>) => {
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}>
        <Icon name="check-circle" size={50} color={Colors.primary} />
        <Text style={{ marginLeft: 8, fontSize: 30 }}>Trasa Zapisana</Text>
      </View>
      <Button
        onPress={() => {
          // @ts-ignore
          navigation.navigate('Tracks');
        }}
        title="Gotowe"
      />
    </SafeAreaView>
  );
};
