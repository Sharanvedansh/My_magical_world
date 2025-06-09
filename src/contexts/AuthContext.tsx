
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  showWelcomeMessage: boolean;
  dismissWelcomeMessage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple admin credentials - in a real app, this would be handled by a backend
const ADMIN_CREDENTIALS = {
  username: 'poet',
  password: 'writewords2024'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('poetryAdminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setShowWelcomeMessage(true);
      localStorage.setItem('poetryAdminAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setShowWelcomeMessage(false);
    localStorage.removeItem('poetryAdminAuth');
  };

  const dismissWelcomeMessage = () => {
    setShowWelcomeMessage(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      showWelcomeMessage,
      dismissWelcomeMessage
    }}>
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
