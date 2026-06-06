import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists and verify it
    const checkAuth = async () => {
      const token = localStorage.getItem('portfolio-admin-token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await API.get('/auth/me');
        if (response.data.success) {
          setAdmin(response.data.admin);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('portfolio-admin-token');
        }
      } catch (error) {
        console.error('Session verify failed:', error.message);
        localStorage.removeItem('portfolio-admin-token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await API.post('/auth/login', { username, password });
      if (response.data.success) {
        localStorage.setItem('portfolio-admin-token', response.data.token);
        setAdmin(response.data.admin);
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed. Please check credentials.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('portfolio-admin-token');
    setAdmin(null);
    setIsAuthenticated(false);
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await API.put('/auth/password', { currentPassword, newPassword });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update password');
    }
  };

  return (
    <AuthContext.Provider value={{ admin, loading, isAuthenticated, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
