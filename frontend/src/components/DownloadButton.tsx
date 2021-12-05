import React from 'react';
import { Button } from '@mui/material';
import { WarningsApi } from '../api/WarningsApi';

export const DownloadButton = () => (
  <Button
    variant="contained"
    color="secondary"
    onClick={WarningsApi.downloadWarnings}>
    Pobierz
  </Button>
);
