import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { MainTabsStackParamList } from './Navigation.types';
import { Text } from 'react-native';
import { Colors } from '../theme/Colors';

export const customScreenOptions = (route: {
  name: keyof MainTabsStackParamList;
}) => ({
  tabBarIcon: customTapBarIcon(route),
  tabBarLabel: customTabBarLabel(route),
  tabBarActiveTintColor: Colors.secondary,
  tabBarInactiveTintColor: Colors.black,
  headerShown: false,
  tabBarStyle: { height: 60, paddingBottom: 5 },
});

const customTapBarIcon =
  (route: { name: keyof MainTabsStackParamList }) =>
  ({ size, color }: { color: string; size: number }): React.ReactNode => {
    if (route.name === 'Tracking') {
      return <Icon name="map-marker" size={size} color={color} />;
    } else if (route.name === 'Warnings') {
      return <Icon name="list" size={size} color={color} />;
    } else if (route.name === 'Ranking') {
      return <Icon name="trophy" size={size} color={color} />;
    }
  };

const customTabBarLabel =
  (route: { name: keyof MainTabsStackParamList }) =>
  ({ color }: { color: string }): React.ReactNode => {
    const style = { fontSize: 16 };
    if (route.name === 'Tracking') {
      return <Text style={{ ...style, color }}>Start</Text>;
    } else if (route.name === 'Warnings') {
      return <Text style={{ ...style, color }}>Zagrożenia</Text>;
    } else if (route.name === 'Ranking') {
      return <Text style={{ ...style, color }}>Ranking</Text>;
    }
  };
