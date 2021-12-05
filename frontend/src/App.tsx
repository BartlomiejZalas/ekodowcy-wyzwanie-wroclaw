import React from 'react';
import {MainScreen} from './pages/main/MainScreen';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {getTheme} from './theme/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={getTheme()}>
        <CssBaseline />
        <MainScreen />
      </ThemeProvider>
    </>
  );
}

export default App;
