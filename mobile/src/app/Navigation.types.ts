import { Tracks } from '../domain/tracks/Tracks.model';
import { Warnings } from '../domain/warnings/Warnings.model';

export type MainTabsStackParamList = {
  Tracking: undefined;
  Ranking: undefined;
  Warnings: undefined;
};

export type StackParamList = {
  Root: undefined;
  SignIn: undefined;
  SignUp: undefined;
  TrackStop: undefined;
  TrackDetails: { track: Tracks.Track };
  WarningDetails: { warning: Warnings.Warning };
};

export type DrawerStackParamList = {
  Home: undefined;
  Settings: undefined;
  Tracks: undefined;
};

export type AllScreens = MainTabsStackParamList &
  StackParamList &
  DrawerStackParamList;
