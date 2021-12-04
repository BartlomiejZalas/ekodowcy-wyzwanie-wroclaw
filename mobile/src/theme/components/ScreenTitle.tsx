import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../Colors';

interface Props {
  text: string;
}

export const ScreenTitle: React.FC<Props> = ({ text }) => {
  return <Text style={styles.root}>{text}</Text>;
};

const styles = StyleSheet.create({
  root: {
    fontSize: 24,
    color: Colors.secondary,
    marginBottom: 32,
    fontWeight: 'bold',
  },
});
