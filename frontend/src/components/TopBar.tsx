import {styled} from '@mui/material';

export const TopBar = styled('div')(({theme}) => ({
  width: '100%',
  boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)',
  padding: '8px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 1,
}));
