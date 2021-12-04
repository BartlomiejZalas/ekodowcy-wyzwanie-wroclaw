import React, { createContext, useCallback, useReducer } from 'react';
import { Tracks } from './Tracks.model';

interface State {
  tracks: Tracks.Track[];
}

interface Context {
  tracks: Tracks.Track[];
  addTrack: (track: Tracks.Track) => void;
  deleteTrack: (trackId: number) => void;
}

type Actions =
  | { type: 'ADD_TRACK'; track: Tracks.Track }
  | { type: 'DELETE_TRACK'; trackId: number };

const notInitialized = () => {
  throw new Error('Context not initialized!');
};

const initialState: State = { tracks: [] };
const defaultValue: Context = {
  tracks: [],
  addTrack: notInitialized,
  deleteTrack: notInitialized,
};

const TracksContext = createContext<Context>(defaultValue);

const reducer = (prevState: State, action: Actions): State => {
  switch (action.type) {
    case 'ADD_TRACK':
      return {
        ...prevState,
        tracks: [...prevState.tracks, action.track],
      };
    case 'DELETE_TRACK':
      return {
        ...prevState,
        tracks: prevState.tracks.filter(t => t.id !== action.trackId),
      };
  }
};

const TracksContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTrack = useCallback((trackData: Omit<Tracks.Track, 'id'>) => {
    // const track = async saveTrackOnBacknd(trackData);
    const track = { ...trackData, id: Math.floor(Math.random() * 1000) };
    dispatch({ type: 'ADD_TRACK', track });
  }, []);

  const deleteTrack = useCallback((trackId: number) => {
    // const track = async deleteTrackOnBacknd(trackData);
    dispatch({ type: 'DELETE_TRACK', trackId });
  }, []);

  const value: Context = {
    tracks: state.tracks,
    addTrack,
    deleteTrack,
  };

  return (
    <TracksContext.Provider value={value}>{children}</TracksContext.Provider>
  );
};

export { TracksContextProvider, TracksContext };
