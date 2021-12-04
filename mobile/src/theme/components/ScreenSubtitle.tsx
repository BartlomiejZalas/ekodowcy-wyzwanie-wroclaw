import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../Colors';

interface Props {
  text: string;
}

export const ScreenSubtitle: React.FC<Props> = ({ text }) => {
  return <Text style={styles.root}>{text}</Text>;
};

const styles = StyleSheet.create({
  root: {
    fontSize: 18,
    color: Colors.black,
    marginBottom: 16,
    fontWeight: '400',
  },
});
