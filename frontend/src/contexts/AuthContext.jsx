import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * AuthContext
 * 
 * Provides authentication state and functions throughout the app
 * 
 * State:
 * - user: Current user data (null if not authenticated)
 * - token: JWT token (null if not authenticated)
 * - isLoading: Whether auth check is in progress
 * 
 * Functions:
 * - login(userData, token): Set user as authenticated
 * - logout(): Clear authentication and redirect to login
 * - checkAuth(): Verify current authentication status
 */
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on app load
    checkAuth();
  }, []);

  /**
   * Login function
   * Sets user and token in state and localStorage
   */
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  /**
   * Logout function
   * Clears user and token from state and localStorage
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  /**
   * Check authentication status
   * Verifies stored token with backend
   */
  const checkAuth = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('userData');

      if (!storedToken || !storedUser) {
        setIsLoading(false);
        return;
      }

      // Verify token with backend
      const response = await fetch('http://localhost:3001/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: storedToken }),
      });

      const data = await response.json();

      if (data.success) {
        // Token is valid
        setUser(data.user);
        setToken(storedToken);
        // Update user data in localStorage
        localStorage.setItem('userData', JSON.stringify(data.user));
      } else {
        // Token is invalid
        logout();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    checkAuth,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};