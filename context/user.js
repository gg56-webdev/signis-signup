import { createContext, useContext } from 'react';
import { useUser } from '../hooks/useUser';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserContextProvide({ children }) {
  const user = useUser();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
