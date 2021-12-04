import React, { createContext, useCallback, useReducer } from 'react';
import { AsyncStorage } from 'react-native';
import { AuthApi } from '../api/AuthApi';
import { HttpClient } from "../api/AuthenticatedHttpClient";

interface State {
  userToken: string | null;
  isLoading: boolean;
  isSignout: boolean;
  username: string | null;
}

interface Context {
  isLoading: boolean;
  isSignout: boolean;
  hasToken: boolean;
  username: string | null;
  restoreToken: () => void;
  signIn: (data: { username: string; password: string }) => void;
  signUp: (data: {
    schoolId: number;
    username: string;
    password: string;
    email: string;
  }) => void;
  signOut: () => void;
}

type Actions =
  | { type: 'RESTORE_TOKEN'; token: string | null; username: string | null }
  | { type: 'SIGN_IN'; token: string; username: string }
  | { type: 'SIGN_UP'; token: string; username: string }
  | { type: 'SIGN_OUT' };

const notInitialized = () => {
  throw new Error('Context not initialized!');
};

const initialState: State = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  username: null,
};
const defaultValue: Context = {
  username: null,
  hasToken: false,
  isSignout: false,
  isLoading: true,
  restoreToken: notInitialized,
  signIn: notInitialized,
  signOut: notInitialized,
  signUp: notInitialized,
};

const AuthContext = createContext<Context>(defaultValue);

const reducer = (prevState: State, action: Actions): State => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
        username: action.username,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        username: action.username,
      };
    case 'SIGN_UP':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        username: action.username,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
};

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const restoreToken = useCallback(async () => {
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');
    if (username && token) {
      HttpClient.initialize(token);
      dispatch({ type: 'RESTORE_TOKEN', token: token, username: username });
    } else {
      dispatch({ type: 'RESTORE_TOKEN', token: null, username: null });
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
    HttpClient.clear();
    dispatch({ type: 'SIGN_OUT' });
  }, []);

  const signIn = useCallback(async ({ username, password }) => {
    const { token, login } = await AuthApi.login(username, password);
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('username', login);
    HttpClient.initialize(token);
    dispatch({ type: 'SIGN_IN', token, username: login });
  }, []);

  const signUp = useCallback(
    async ({ username, password, schoolId, email }) => {
      const { token, login } = await AuthApi.register({
        login: username,
        password,
        rePassword: password,
        schoolId,
        email,
        type: 'USER',
      });
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('username', login);
      HttpClient.initialize(token);
      dispatch({ type: 'SIGN_IN', token, username: login });
    },
    [],
  );

  const value: Context = {
    hasToken: Boolean(state.userToken),
    isLoading: state.isLoading,
    isSignout: state.isSignout,
    username: state.username,
    signIn,
    signUp,
    signOut,
    restoreToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
