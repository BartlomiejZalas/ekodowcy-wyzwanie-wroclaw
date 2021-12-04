import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { Colors } from '../Colors';

export const Link: React.FC<
  TouchableOpacityProps & { title: string; description?: string }
> = ({ description, title, ...props }) => {
  return (
    <View style={styles.container}>
      {description && (
        <Text style={styles.description}>{description + ' '}</Text>
      )}
      <TouchableOpacity {...props}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: Colors.secondary,
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
