// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import { storage } from '../utils/storage';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(storage.getToken());

  const login = (newToken: string) => {
    storage.setToken(newToken);
    setToken(newToken);
  };

  const logout = () => {
    storage.removeToken();
    setToken(null);
  };

  const isAuthenticated = token !== null;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
