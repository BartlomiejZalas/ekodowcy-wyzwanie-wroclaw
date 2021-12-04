import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors } from '../Colors';

export const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: Colors.darkGray,
    borderBottomWidth: 1,
    height: 32,
    marginBottom: 32,
    marginHorizontal: 32,
  },
});
