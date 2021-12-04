import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Colors } from '../Colors';

export const Textarea: React.FC<TextInputProps> = props => {
  return <TextInput {...props} style={styles.input} />;
};
const styles = StyleSheet.create({
  input: {
    borderColor: Colors.darkGray,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
    marginBottom: 24,
    flex: 1,
    textAlignVertical: 'top',
  },
});
