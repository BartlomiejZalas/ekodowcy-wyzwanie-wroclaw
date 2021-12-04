import React from 'react';
import { SafeAreaView } from 'react-native';
import { Colors } from '../Colors';

export const ScreenContainer: React.FC = ({ children }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, padding: 24, backgroundColor: Colors.white }}>
      {children}
    </SafeAreaView>
  );
};
