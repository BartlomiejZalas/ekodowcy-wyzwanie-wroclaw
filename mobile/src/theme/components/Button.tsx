import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { Colors } from '../Colors';

export const StyledButton: React.FC<
  TouchableOpacityProps & { title: string; color?: string }
> = ({ title, color = Colors.secondary, ...props }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        {...props}
        style={{ ...styles.root, backgroundColor: color }}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  root: {
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 48,
  },
  text: {
    textTransform: 'uppercase',
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
