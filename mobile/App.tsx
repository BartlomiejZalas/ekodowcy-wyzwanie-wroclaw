import React from 'react';
import 'react-native-gesture-handler';
import { RootNavigation } from './src/app/RootNavigation';
import { AuthProvider } from './src/auth/AuthContext';
import { TracksContextProvider } from './src/domain/tracks/TracksContext';
import { WarningContextProvider } from './src/domain/warnings/WarningsContext';

const App = () => {
  return (
    <AuthProvider>
      <TracksContextProvider>
        <WarningContextProvider>
          <RootNavigation />
        </WarningContextProvider>
      </TracksContextProvider>
    </AuthProvider>
  );
};

export default App;
