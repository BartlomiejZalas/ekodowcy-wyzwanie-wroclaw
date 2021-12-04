import React from 'react';
import { TextInputProps } from 'react-native';
import { TextField } from './TextField';

export const Textarea: React.FC<TextInputProps & { label: string }> = props => {
  return <TextField {...props} multiline />;
};
