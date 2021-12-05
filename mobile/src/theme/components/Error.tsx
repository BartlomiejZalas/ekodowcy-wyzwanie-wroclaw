import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Colors } from '../Colors';

interface Props {
  text?: string;
}

export const Error: React.FC<Props> = ({
  text = 'Coś poszło nie tak! Prosimy spróbować później.',
}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    textAlign: 'center',
    backgroundColor: Colors.error,
  },
  text: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
