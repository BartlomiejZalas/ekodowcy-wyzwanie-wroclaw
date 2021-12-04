import React, { createContext, useCallback, useReducer } from 'react';
import { Warnings } from './Warnings.model';

interface State {
  warnings: Warnings.Warning[];
}

interface Context {
  warnings: Warnings.Warning[];
  addWarning: (warning: Omit<Warnings.Warning, 'id'>) => void;
  updateWarningDescription: (id: number, description: string) => void;
}

type Actions =
  | { type: 'ADD_WARNING'; warning: Warnings.Warning }
  | { type: 'UPDATE_DESCRIPTION'; id: number; description: string };

const notInitialized = () => {
  throw new Error('Context not initialized!');
};

const initialState: State = { warnings: [] };
const defaultValue: Context = {
  warnings: [],
  addWarning: notInitialized,
  updateWarningDescription: notInitialized,
};

const WarningsContext = createContext<Context>(defaultValue);

const reducer = (prevState: State, action: Actions): State => {
  switch (action.type) {
    case 'ADD_WARNING':
      return {
        ...prevState,
        warnings: [...prevState.warnings, action.warning],
      };
    case 'UPDATE_DESCRIPTION':
      return {
        ...prevState,
        warnings: prevState.warnings.map(w =>
          w.id === action.id ? { ...w, description: action.description } : w,
        ),
      };
  }
};

const WarningContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addWarning = useCallback(
    (warningData: Omit<Warnings.Warning, 'id'>) => {
      // const track = async saveTrackOnBacknd(trackData);
      const warning = { ...warningData, id: Math.floor(Math.random() * 1000) };
      dispatch({ type: 'ADD_WARNING', warning });
    },
    [],
  );

  const updateWarningDescription = useCallback(
    (id: number, description: string) => {
      // const track = async updateTrackOnBacknd(trackData);
      dispatch({ type: 'UPDATE_DESCRIPTION', description, id });
    },
    [],
  );

  const value: Context = {
    warnings: state.warnings,
    addWarning,
    updateWarningDescription,
  };

  return (
    <WarningsContext.Provider value={value}>
      {children}
    </WarningsContext.Provider>
  );
};

export { WarningContextProvider, WarningsContext };
