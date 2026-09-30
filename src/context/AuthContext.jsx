import { createContext, useContext, useState } from 'react';
import * as authApi from '../api/auth.js';
import { clearSession, getStoredUser, saveSession } from '../utils/storage.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  const start = (session) => {
    saveSession(session);
    setUser(session.user);
  };

  const value = {
    user,
    login: async (data) => start(await authApi.login(data)),
    register: async (data) => start(await authApi.register(data)),
    logout: () => {
      clearSession();
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
