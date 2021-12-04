import { Tracks } from '../domain/tracks/Tracks.model';

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
  AddWarning: undefined;
};

export type DrawerStackParamList = {
  Home: undefined;
  Settings: undefined;
  Tracks: undefined;
};

export type AllScreens = MainTabsStackParamList &
  StackParamList &
  DrawerStackParamList;
