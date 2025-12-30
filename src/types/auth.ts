// Auth Types - Template
// Add authentication related types here

export interface AuthState {
  user: null | any; // TODO: Replace with proper User type
  isAuthenticated: boolean;
  // TODO: Add more auth state properties
}

export interface LoginCredentials {
  email: string;
  password: string;
}
