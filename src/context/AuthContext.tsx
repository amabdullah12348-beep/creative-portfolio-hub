import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getAuthToken } from '../services/api.ts';

interface AuthContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  isLoading: true,
  login: async () => false,
  logout: async () => {},
  checkAuth: async () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async (): Promise<boolean> => {
    const token = getAuthToken();
    if (!token) {
      setIsAdmin(false);
      setIsLoading(false);
      return false;
    }
    try {
      const isValid = await api.verifyAuth();
      setIsAdmin(isValid);
      return isValid;
    } catch {
      setIsAdmin(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      const res = await api.login(password);
      if (res.success) {
        setIsAdmin(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } finally {
      setIsAdmin(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
