import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

export const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <View style={{ padding: 16 }}>
        <Icon name="keyboard-backspace" size={20} />
      </View>
    </Pressable>
  );
};
