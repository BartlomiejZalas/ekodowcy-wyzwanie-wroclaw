import React, { useContext, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../auth/AuthContext';
import { CustomDrawer } from './CustomDrawer';
import { Colors } from '../theme/Colors';
import { customScreenOptions } from './Navigation.customization';
import { TrackingScreen } from '../domain/tracking/screens/TrackingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DrawerStackParamList,
  MainTabsStackParamList,
  StackParamList,
} from './Navigation.types';
import { TrackFinishedScreen } from '../domain/tracking/screens/TrackFinishedScreen';
import { TracksScreen } from '../domain/tracks/screens/TracksScreen';
import { TrackDetailsScreen } from '../domain/tracks/screens/TrackDetailsScreen';
import { WarningsScreen } from '../domain/warnings/screens/WarningsScreen';
import { SignInScreen } from '../auth/screens/SignInScreen';
import { SignUpScreen } from '../auth/screens/SignUpScreen';
import { AddWarningScreen } from '../domain/warnings/screens/AddWarningScreen';
import { BackButton } from '../theme/components/BackButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RankingScreen } from '../domain/ranking/screens/RankingScreen';
import { TrackStartedScreen } from "../domain/tracking/screens/TrackStartedScreen";

const Settings = () => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Splash screen</Text>
      <Text>LOGO</Text>
    </View>
  );
};

const Drawer = createDrawerNavigator<DrawerStackParamList>();
const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<MainTabsStackParamList>();

const DrawerNavigation = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={CustomDrawer}
    screenOptions={{
      drawerActiveTintColor: Colors.primary,
      drawerActiveBackgroundColor: Colors.primaryLight,
    }}>
    <Drawer.Screen
      name="Home"
      component={MainTabs}
      options={{ title: '', drawerItemStyle: { height: 0 } }}
    />
    <Drawer.Screen
      name="Settings"
      component={Settings}
      options={{
        title: 'Ustawienia',
        headerLeft: BackButton,
        drawerIcon: () => <Icon name="cog" size={24} color={Colors.black} />,
        drawerLabelStyle: {
          color: Colors.black,
          fontSize: 14,
          fontWeight: 'bold',
        },
      }}
    />
    <Drawer.Screen
      name="Tracks"
      component={TracksScreen}
      options={{
        title: 'Trasy',
        headerLeft: BackButton,
        drawerIcon: () => <Icon name="map" size={24} color={Colors.black} />,
        drawerLabelStyle: {
          color: Colors.black,
          fontSize: 14,
          fontWeight: 'bold',
        },
      }}
    />
  </Drawer.Navigator>
);

export const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => customScreenOptions(route)}
    initialRouteName="Tracking">
    <Tab.Screen name="Tracking" component={TrackingScreen} />
    <Tab.Screen name="Ranking" component={RankingScreen} />
    <Tab.Screen name="Warnings" component={WarningsScreen} />
  </Tab.Navigator>
);

export const RootNavigation = () => {
  const { isLoading, hasToken, restoreToken } = useContext(AuthContext);

  useEffect(() => {
    restoreToken();
  }, [restoreToken]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: '#FFF' } }}>
        {!hasToken ? (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Root"
              component={DrawerNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Group
              screenOptions={{ presentation: 'modal', headerShown: false }}>
              <Stack.Screen name="TrackStop" component={TrackFinishedScreen} />
              <Stack.Screen name="AddWarning" component={AddWarningScreen} />
              <Stack.Screen name="TrackStarted" component={TrackStartedScreen} />
            </Stack.Group>
            <Stack.Screen
              name="TrackDetails"
              component={TrackDetailsScreen}
              options={{ title: 'Szczeg????y Trasy' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
