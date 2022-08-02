import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const userAuth = useAuth();
  return <AuthContext.Provider value={userAuth}>{children}</AuthContext.Provider>;
}
