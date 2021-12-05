import React from 'react';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles(theme => ({
  title: {
    color: '#000',
    fontSize: 24,
  },
}));

export const Title = () => {
  const classes = useStyles();
  return <div className={classes.title}>Mapa zgłoszonych zagrożeń</div>;
};
