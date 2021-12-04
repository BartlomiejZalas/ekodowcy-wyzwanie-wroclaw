import React, { createContext, useCallback, useReducer } from 'react';

interface State {
  userToken: string | null;
  isLoading: boolean;
  isSignout: boolean;
}

interface Context {
  isLoading: boolean;
  isSignout: boolean;
  hasToken: boolean;
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
  | { type: 'RESTORE_TOKEN'; token: string }
  | { type: 'SIGN_IN'; token: string }
  | { type: 'SIGN_OUT' };

const notInitialized = () => {
  throw new Error('Context not initialized!');
};

const initialState: State = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};
const defaultValue: Context = {
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
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
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

  const restoreToken = useCallback(() => {
    // userToken = await SecureStore.getItemAsync('userToken');
    console.log('restoring token');
    dispatch({ type: 'RESTORE_TOKEN', token: 'dummy-auth-token' });
  }, []);

  const signOut = useCallback(() => {
    console.log('logout');
    dispatch({ type: 'SIGN_OUT' });
  }, []);

  const signIn = useCallback(async ({ username, password }) => {
    // In a production app, we need to send some data (usually username, password) to server and get a token
    // We will also need to handle errors if sign in failed
    // After getting token, we need to persist the token using `SecureStore`
    // In the example, we'll use a dummy token
    console.log('login', username, password);
    dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
  }, []);

  const signUp = useCallback(
    async ({ username, password, schoolId, email }) => {
      // In a production app, we need to send user data to server and get a token
      // We will also need to handle errors if sign up failed
      // After getting token, we need to persist the token using `SecureStore`
      // In the example, we'll use a dummy token
      console.log('register and login', username, password, schoolId, email);
      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    },
    [],
  );

  const value: Context = {
    hasToken: Boolean(state.userToken),
    isLoading: state.isLoading,
    isSignout: state.isSignout,
    signIn,
    signUp,
    signOut,
    restoreToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
