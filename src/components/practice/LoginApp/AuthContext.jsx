import React, { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from './api';

// Auth context
const AuthContext = createContext();

// Auth states
const AUTH_STATES = {
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  ERROR: 'error'
};

// Auth actions
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_UNAUTHENTICATED: 'SET_UNAUTHENTICATED',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Initial state
const initialState = {
  status: AUTH_STATES.LOADING,
  user: null,
  error: null
};

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        status: AUTH_STATES.LOADING,
        error: null
      };

    case AUTH_ACTIONS.SET_AUTHENTICATED:
      return {
        ...state,
        status: AUTH_STATES.AUTHENTICATED,
        user: action.payload.user,
        error: null
      };

    case AUTH_ACTIONS.SET_UNAUTHENTICATED:
      return {
        ...state,
        status: AUTH_STATES.UNAUTHENTICATED,
        user: null,
        error: null
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        status: AUTH_STATES.ERROR,
        error: action.payload.error
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
}

// Auth provider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const refreshToken = apiService.getRefreshToken();
    
    if (!refreshToken) {
      dispatch({ type: AUTH_ACTIONS.SET_UNAUTHENTICATED });
      return;
    }

    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING });
      
      // Try to get current user (this will refresh token if needed)
      const userData = await apiService.getCurrentUser();
      
      dispatch({
        type: AUTH_ACTIONS.SET_AUTHENTICATED,
        payload: { user: userData.user }
      });
    } catch (error) {
      console.error('Auth initialization failed:', error);
      dispatch({ type: AUTH_ACTIONS.SET_UNAUTHENTICATED });
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING });
      
      const response = await apiService.login(credentials);
      
      dispatch({
        type: AUTH_ACTIONS.SET_AUTHENTICATED,
        payload: { user: response.user }
      });

      return response;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: error.message }
      });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING });
      
      const response = await apiService.register(userData);
      
      dispatch({
        type: AUTH_ACTIONS.SET_AUTHENTICATED,
        payload: { user: response.user }
      });

      return response;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: error.message }
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_UNAUTHENTICATED });
    }
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    // State
    ...state,
    isLoading: state.status === AUTH_STATES.LOADING,
    isAuthenticated: state.status === AUTH_STATES.AUTHENTICATED,
    isUnauthenticated: state.status === AUTH_STATES.UNAUTHENTICATED,
    hasError: state.status === AUTH_STATES.ERROR,
    
    // Actions
    login,
    register,
    logout,
    clearError,
    
    // Utils
    AUTH_STATES
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

export { AUTH_STATES };