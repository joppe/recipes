import { ReactNode, createContext, useState } from 'react';

import { login } from './login';
import { meQuery } from './me.query';
import { useQuery } from '@apollo/client';

import { useCookie } from '../cookie/useCookie';

export type UserInfo = {
  name: string;
  email: string;
};

export type AutContextValue = {
  isLoggedIn: boolean;
  user: null | UserInfo;
  login(username: string, password: string): Promise<boolean>;
  logout(): void;
};

export type AutContextProviderProps = {
  children: ReactNode;
  loginComponent: ReactNode;
};

export const AuthContext = createContext<AutContextValue | null>(null);

export const TOKEN_COOKIE_NAME = 'auth';

export function AutContextProvider({
  children,
  loginComponent,
}: AutContextProviderProps) {
  const { get: getCookie, set: setCookie, remove: removeCookie } = useCookie();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return getCookie(TOKEN_COOKIE_NAME) !== undefined;
  });
  const { data, loading, error } = useQuery(meQuery, {
    skip: !isLoggedIn,
  });
  const value = {
    isLoggedIn,
    get user() {
      if (!data?.me) {
        return null;
      }

      const { name, email } = data.me;

      return { name, email };
    },
    login: async (username: string, password: string) => {
      const result = await login(username, password);

      if (result === false) {
        return false;
      }

      setCookie(TOKEN_COOKIE_NAME, result);
      setIsLoggedIn(true);

      return true;
    },
    logout: () => {
      removeCookie(TOKEN_COOKIE_NAME);
      setIsLoggedIn(false);
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoggedIn ? children : loginComponent}
    </AuthContext.Provider>
  );
}
