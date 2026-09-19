import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminCredentials {
  username: string;
  email: string;
  passwordHash: string; // Stored password
}

const DEFAULT_CREDENTIALS: AdminCredentials = {
  username: 'admin',
  email: 'admin@santanafisiovet.com.br',
  passwordHash: 'admin123',
};

const CREDS_STORAGE_KEY = 'santana_fisiovet_admin_creds_v1';
const SESSION_STORAGE_KEY = 'santana_fisiovet_admin_session_v1';

interface AuthContextType {
  isAuthenticated: boolean;
  adminUser: { username: string; email: string };
  login: (identity: string, pass: string) => boolean;
  logout: () => void;
  changePassword: (currentPass: string, newPass: string) => { success: boolean; message: string };
  updateProfile: (username: string, email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [credentials, setCredentials] = useState<AdminCredentials>(() => {
    try {
      const saved = localStorage.getItem(CREDS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load admin credentials:', e);
    }
    return DEFAULT_CREDENTIALS;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(SESSION_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CREDS_STORAGE_KEY, JSON.stringify(credentials));
    } catch (e) {
      console.error('Failed to save credentials:', e);
    }
  }, [credentials]);

  const login = (identity: string, pass: string): boolean => {
    const trimmedIdentity = identity.trim().toLowerCase();
    const isUserMatch =
      trimmedIdentity === credentials.username.toLowerCase() ||
      trimmedIdentity === credentials.email.toLowerCase();
    const isPassMatch = pass === credentials.passwordHash;

    if (isUserMatch && isPassMatch) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem(SESSION_STORAGE_KEY, 'true');
      } catch (e) {
        console.error('Failed to save session:', e);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear session:', e);
    }
  };

  const changePassword = (currentPass: string, newPass: string) => {
    if (currentPass !== credentials.passwordHash) {
      return { success: false, message: 'A senha atual informada está incorreta.' };
    }
    if (!newPass || newPass.length < 4) {
      return { success: false, message: 'A nova senha deve possuir no mínimo 4 caracteres.' };
    }

    setCredentials((prev) => ({
      ...prev,
      passwordHash: newPass,
    }));
    return { success: true, message: 'Senha alterada com sucesso!' };
  };

  const updateProfile = (username: string, email: string) => {
    setCredentials((prev) => ({
      ...prev,
      username: username.trim() || prev.username,
      email: email.trim() || prev.email,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        adminUser: { username: credentials.username, email: credentials.email },
        login,
        logout,
        changePassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
