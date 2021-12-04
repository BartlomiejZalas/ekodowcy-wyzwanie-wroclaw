import React, { useContext } from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { AuthContext } from '../auth/AuthContext';
import { Text, View } from 'react-native';
import { Colors } from '../theme/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LogoutItem = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <DrawerItem
      label="Wyloguj"
      onPress={signOut}
      icon={() => <Icon name="logout" size={24} color={Colors.black} />}
      labelStyle={{ color: Colors.black, fontSize: 14, fontWeight: 'bold' }}
    />
  );
};

const Header = () => {
  const { username } = useContext(AuthContext);
  return (
    <View
      style={{
        padding: 16,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 1,
        marginBottom: 8,
      }}>
      <Text style={{ color: Colors.primary, fontSize: 24 }}>{username}</Text>
    </View>
  );
};

export const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  return (
    <DrawerContentScrollView {...props}>
      <Header />
      <DrawerItemList {...props} />
      <LogoutItem />
    </DrawerContentScrollView>
  );
};
