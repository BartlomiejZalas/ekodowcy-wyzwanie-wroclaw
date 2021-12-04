import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Text,
} from 'react-native';
import { Colors } from '../Colors';

export const TextField: React.FC<
  TextInputProps & { label: string; error?: string }
> = ({ label, error, ...props }) => {
  return (
    <View style={styles.spacing}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput {...props} style={styles.input} />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGray,
  },
  spacing: {
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  input: {
    marginVertical: 0,
    paddingVertical: 0,
    fontSize: 16,
    color: Colors.black,
  },
  error: {
    color: Colors.error,
    fontWeight: 'bold',
    fontSize: 12,
  },
});
