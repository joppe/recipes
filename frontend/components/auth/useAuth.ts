import { useContext } from 'react';

import { AutContextValue, AuthContext } from './AuthProvider';

export function useAuth(): AutContextValue {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('Could not find AuthContext');
  }

  return context;
}
