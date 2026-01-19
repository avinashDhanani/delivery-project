// Client-side auth utilities
export const clientAuthUtils = {
  // Validate JWT token format and expiration (client-side check)
  validateToken: (token: string): boolean => {
    if (!token || typeof token !== 'string') return false;

    try {
      // Basic JWT structure check
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Decode payload to check expiration
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if token is expired (add 60 seconds buffer for clock skew)
      if (payload.exp && payload.exp < (currentTime - 60)) {
        console.log('Token expired:', new Date(payload.exp * 1000));
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  },

  // Get auth headers with token from localStorage
  getAuthHeaders: (): Record<string, string> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  // Store token in localStorage
  storeToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },

  // Remove token from localStorage
  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  // Get stored user data
  getStoredUser: (): any => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  // Store user data in localStorage
  storeUser: (user: any): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  // Clear stored auth data
  clearStoredAuth: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Check if user is authenticated (has valid token and user data)
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return !!(token && user && clientAuthUtils.validateToken(token));
  }
};
