import { createTheme } from '@mui/material';

export const getTheme = () => {
  let theme = createTheme({
    palette: {
      primary: {
        main: '#7766C6',
        light: '#E0DFFD',
      },
      secondary: {
        main: '#318C2C',
      },
    },
  });

  theme = createTheme(theme, {
    palette: {
      additional: {
        main: '#FFC212',
      },
    },
  });

  return theme;
};
