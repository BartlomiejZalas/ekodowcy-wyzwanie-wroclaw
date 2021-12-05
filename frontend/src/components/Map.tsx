import React from 'react';
import { makeStyles } from '@mui/styles';
import { Warning } from '../api/WarningsApi';
import { CircularProgress } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { marker } from '../assets/marker';

const useStyles = makeStyles({
  container: {
    height: '100%',
    width: '100%',
    background: '#FFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const defaultCenter = {
  lat: 51.107883,
  lng: 17.038538,
};

interface Props {
  warnings: Warning[];
  isLoading: boolean;
}

export const Map: React.FC<Props> = ({ warnings, isLoading }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <MapContainer
          center={defaultCenter}
          zoom={13}
          className={classes.container}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {warnings.map(w => (
            <Marker
              key={w.id}
              position={[w.latitude, w.longitude]}
              icon={marker}>
              <Popup>{w.description || 'Brak opisu'}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};
