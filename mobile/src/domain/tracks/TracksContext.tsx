import React, { createContext, useCallback, useReducer } from 'react';
import { Tracks } from './Tracks.model';
import { TracksApi } from '../../api/TracksApi';

interface State {
  tracks: Tracks.Track[];
}

interface Context {
  tracks: Tracks.Track[];
  addTrack: (track: Tracks.Track) => void;
  getTracks: () => void;
}

type Actions =
  | { type: 'ADD_TRACK'; track: Tracks.Track }
  | { type: 'GET_TRACKS'; tracks: Tracks.Track[] };

const notInitialized = () => {
  throw new Error('Context not initialized!');
};

const initialState: State = { tracks: [] };
const defaultValue: Context = {
  tracks: [],
  addTrack: notInitialized,
  getTracks: notInitialized,
};

const TracksContext = createContext<Context>(defaultValue);

const reducer = (prevState: State, action: Actions): State => {
  switch (action.type) {
    case 'ADD_TRACK':
      return {
        ...prevState,
        tracks: [...prevState.tracks, action.track],
      };
    case 'GET_TRACKS':
      return {
        ...prevState,
        tracks: action.tracks,
      };
  }
};

const TracksContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTrack = useCallback(async (trackData: Omit<Tracks.Track, 'id'>) => {
    const track = await TracksApi.addTrack(trackData);
    dispatch({ type: 'ADD_TRACK', track });
  }, []);

  const getTracks = useCallback(async () => {
    const tracks = await TracksApi.getTracks();
    dispatch({ type: 'GET_TRACKS', tracks });
  }, []);

  const value: Context = {
    tracks: state.tracks,
    addTrack,
    getTracks,
  };

  return (
    <TracksContext.Provider value={value}>{children}</TracksContext.Provider>
  );
};

export { TracksContextProvider, TracksContext };
