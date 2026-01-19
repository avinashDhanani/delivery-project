// Auth Types

import { User } from './user';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token?: string;
  isLoading?: boolean;
  error?: string | null;
  requiresOtp?: boolean;
  otpType?: 'registration' | 'login' | 'forgot_password' | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface JWTPayload {
  userId: number;
  email: string;
  role_type: string;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
    requires_otp?: boolean;
  };
  error?: string;
}

export interface OtpVerificationResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
    kyc_required?: boolean;
  };
}
