import logo from '../assets/wroclaw-logo-png-transparent.png';
import { PersonPin, WarningAmber } from '@mui/icons-material';
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    width: 120,
    // @ts-ignore
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    boxShadow: '4px 0px 8px 0px rgba(0, 0, 0, 0.2)',
    height: '100%',
    zIndex: 2,
  },
  logo: {
    width: 100,
    height: 100,
    padding: 10,
    borderBottom: '1px solid #979797',
  },
  tabs: {
    marginTop: 16,
    width: '100%',
  },
  tab: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  tabActive: {
    // @ts-ignore
    background: theme.palette.primary.main,
    color: '#FFF',
  },
}));

export const SideBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img src={logo} alt="logo" className={classes.logo} />
      <div className={classes.tabs}>
        <div className={classes.tab}>
          <PersonPin sx={{ fontSize: 40 }} />
          Trasy
        </div>
        <div className={classes.tab + ' ' + classes.tabActive}>
          <WarningAmber sx={{ fontSize: 40 }} />
          Zgłoszenia
        </div>
      </div>
    </div>
  );
};
