import React, { useContext } from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { AuthContext } from '../auth/AuthContext';
import { Text } from 'react-native';
import { name } from './../../app.json';
import { Colors } from '../theme/Colors';

const LogoutItem = () => {
  const { signOut } = useContext(AuthContext);
  return <DrawerItem label="Wyloguj" onPress={signOut} />;
};

export const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={{ color: Colors.primary, fontSize: 20, padding: 16 }}>
        {name}
      </Text>
      <DrawerItemList {...props} />
      <LogoutItem />
    </DrawerContentScrollView>
  );
};
