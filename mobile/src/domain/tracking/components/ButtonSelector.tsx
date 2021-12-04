import { TrackType } from '../Tracking.types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../theme/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  value: string;
  onChange: (type: string) => void;
  items: Array<{ type: string; iconName: string }>;
}

export const ButtonSelector = ({ value, onChange, items }: Props) => {
  const IconButton: React.FC<{ type: string; iconName: string }> = ({
    type,
    iconName,
  }) => {
    const active = value === type;
    const backgroundColor = active ? Colors.primary : undefined;
    const color = active ? Colors.white : Colors.black;
    const size = active ? 30 : 25;
    return (
      <TouchableOpacity
        onPress={() => onChange(type)}
        style={{ ...styles.button, backgroundColor }}>
        <Icon name={iconName} color={color} size={size} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {items.map(i => (
        <IconButton type={i.type} iconName={i.iconName} key={i.type} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  button: {
    padding: 10,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
});
