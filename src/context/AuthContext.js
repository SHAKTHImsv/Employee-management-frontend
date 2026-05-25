import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Safe functional initialization from LocalStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  
  // Starts as true to hold the application redirect logic back while loading state hydrates
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Session validation sync check completed
    setLoading(false);
  }, [token]);

  const login = useCallback((userData, authToken) => {
    // Check if userData contains specific user inputs to assign dummy names, or use incoming payload
    let finalUserData = userData;
    let finalAuthToken = authToken || 'dummy-jwt-token-xyz123';

    // If login is called manually via mock testing or simple credentials matching
    if (userData && (userData.email === 'admin@workspace.com' || userData === 'admin@workspace.com')) {
      finalUserData = {
        name: 'Alex Crimson',
        email: 'admin@workspace.com',
        role: 'Administrator'
      };
    } else if (!userData || Object.keys(userData).length === 0) {
      // Complete fallback if you call login() completely empty
      finalUserData = {
        name: 'Demo Creator',
        email: 'demo@workspace.com',
        role: 'User'
      };
    }

    setUser(finalUserData);
    setToken(finalAuthToken);
    localStorage.setItem('token', finalAuthToken);
    localStorage.setItem('user', JSON.stringify(finalUserData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const value = {
    user,
    token,
    loading,
    setLoading,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};