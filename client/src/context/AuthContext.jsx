import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../api/index.js';
import { tokenStore } from '../api/http.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // True while a saved token is being checked on first load.
  const [checking, setChecking] = useState(Boolean(tokenStore.get()));

  useEffect(() => {
    if (!tokenStore.get()) return;

    authApi
      .me()
      .then((data) => setUser(data.user))
      .catch(() => tokenStore.clear())
      .finally(() => setChecking(false));
  }, []);

  const startSession = ({ token, user: loggedInUser }) => {
    tokenStore.set(token);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const login = async (credentials) => startSession(await authApi.login(credentials));
  const register = async (details) => startSession(await authApi.register(details));

  const logout = () => {
    tokenStore.clear();
    setUser(null);
  };

  const value = {
    user,
    checking,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
