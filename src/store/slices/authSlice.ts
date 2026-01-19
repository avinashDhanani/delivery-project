import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';
import { AuthState, AuthResponse, OtpVerificationResponse } from '../../types/auth';
import { clientAuthUtils } from '../../lib/clientAuth';

// Initialize state from localStorage if available
const getInitialState = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      isAuthenticated: false,
    };
  }

  const token = localStorage.getItem('token');
  const user = clientAuthUtils.getStoredUser();

  // Validate token format, expiration, and user data availability
  const isValidToken = token && user && clientAuthUtils.validateToken(token);

  // Clear invalid tokens
  if (token && !isValidToken) {
    clientAuthUtils.clearStoredAuth();
  }

  return {
    user: isValidToken ? user : null,
    isAuthenticated: !!isValidToken,
    token: isValidToken ? token : undefined,
  };
};

const initialState: AuthState = getInitialState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      clientAuthUtils.storeUser(action.payload);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      clientAuthUtils.storeToken(action.payload);
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = undefined;
      state.error = null;
      state.isLoading = false;
      state.requiresOtp = false;
      state.otpType = null;
      clientAuthUtils.clearStoredAuth();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setOtpRequired: (state, action: PayloadAction<boolean>) => {
      state.requiresOtp = action.payload;
    },
    setOtpType: (state, action: PayloadAction<'registration' | 'login' | 'forgot_password' | null>) => {
      state.otpType = action.payload;
    },
  },
});

export const {
  setUser,
  setToken,
  clearAuth,
  setLoading,
  setError,
  setOtpRequired,
  setOtpType
} = authSlice.actions;

export default authSlice.reducer;
