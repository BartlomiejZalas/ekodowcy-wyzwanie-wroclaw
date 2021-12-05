import React, {useEffect, useState} from 'react';
import {SideBar} from '../../components/SideBar';
import {makeStyles} from '@mui/styles';
import {TopBar} from '../../components/TopBar';
import {Map} from '../../components/Map';
import {Warning, WarningsApi} from '../../api/WarningsApi';
import {DownloadButton} from '../../components/DownloadButton';
import {Counter} from '../../components/Counter';
import {Title} from '../../components/Title';
import {useWarningsFetching} from './useWarningsFetching';
import {Alert} from '@mui/material';

const useStyles = makeStyles({
  container: {
    height: '100%',
    display: 'flex',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    background: '#FFF',
  },
});

export const MainScreen: React.FC = () => {
  const classes = useStyles();
  const {isLoading, isError, warnings} = useWarningsFetching();

  return (
    <div className={classes.container}>
      <SideBar />
      <div className={classes.rowContainer}>
        <TopBar>
          <Title />
        </TopBar>
        <TopBar sx={{padding: 2}}>
          <Counter count={warnings.length} />
          <DownloadButton />
        </TopBar>
        {isError && (
          <Alert severity="error" variant="filled">
            Błąd pobierania danych! Prosimy spróbować później.
          </Alert>
        )}
        <Map warnings={warnings} isLoading={isLoading} />
      </div>
    </div>
  );
};
