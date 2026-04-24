import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for "remember me"
    const storedUser = localStorage.getItem('elite_auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, remember: boolean) => {
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate simple validation
    if (password === 'wrong') throw new Error('Invalid credentials');
    
    const mockUser = { id: 'u1', email, name: email.split('@')[0] };
    setUser(mockUser);
    
    if (remember) {
      localStorage.setItem('elite_auth_user', JSON.stringify(mockUser));
    } else {
      sessionStorage.setItem('elite_auth_user', JSON.stringify(mockUser));
    }
  };

  const loginWithGoogle = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser = { id: 'g1', email: 'user@google.com', name: 'Google User' };
    setUser(mockUser);
    localStorage.setItem('elite_auth_user', JSON.stringify(mockUser));
  };

  const register = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser = { id: 'u2', email, name: email.split('@')[0] };
    setUser(mockUser);
    localStorage.setItem('elite_auth_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('elite_auth_user');
    sessionStorage.removeItem('elite_auth_user');
  };

  const resetPassword = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate success
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, register, logout, resetPassword, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
