import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  token: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem('authToken');
    return storedToken ? storedToken : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem('authToken'));

  useEffect(() => {
    // Sync the login state and token with localStorage whenever they change
    if (token) {
      localStorage.setItem('authToken', token); // Save token in localStorage
    } else {
      localStorage.removeItem('authToken'); // Remove token when logged out
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
