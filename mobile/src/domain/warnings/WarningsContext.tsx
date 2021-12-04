import React, { createContext, useCallback, useReducer } from 'react';
import { Warnings } from './Warnings.model';
import { WarningsApi } from '../../api/WarningsApi';

interface State {
  warnings: Warnings.Warning[];
}

interface Context {
  warnings: Warnings.Warning[];
  addWarning: (warning: Omit<Warnings.Warning, 'id'>) => void;
  getWarnings: () => void;
  updateWarningDescription: (id: number, description: string) => void;
}

type Actions =
  | { type: 'ADD_WARNING'; warning: Warnings.Warning }
  | { type: 'UPDATE_DESCRIPTION'; id: number; description: string }
  | { type: 'GET_WARNINGS'; warnings: Warnings.Warning[] };

const notInitialized = () => {
  throw new Error('Context not initialized!');
};

const initialState: State = { warnings: [] };
const defaultValue: Context = {
  warnings: [],
  addWarning: notInitialized,
  getWarnings: notInitialized,
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
    case 'GET_WARNINGS':
      return {
        ...prevState,
        warnings: action.warnings,
      };
  }
};

const WarningContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addWarning = useCallback(
    async (warningData: Omit<Warnings.Warning, 'id'>) => {
      const warning = await WarningsApi.addWarning(warningData);
      dispatch({ type: 'ADD_WARNING', warning });
    },
    [],
  );

  const updateWarningDescription = useCallback(
    async (id: number, description: string) => {
      await WarningsApi.updateDescription(id, description);
      dispatch({ type: 'UPDATE_DESCRIPTION', description, id });
    },
    [],
  );

  const getWarnings = useCallback(async () => {
    const warnings = await WarningsApi.getWarnings();
    dispatch({ type: 'GET_WARNINGS', warnings });
  }, []);

  const value: Context = {
    warnings: state.warnings,
    addWarning,
    getWarnings,
    updateWarningDescription,
  };

  return (
    <WarningsContext.Provider value={value}>
      {children}
    </WarningsContext.Provider>
  );
};

export { WarningContextProvider, WarningsContext };
