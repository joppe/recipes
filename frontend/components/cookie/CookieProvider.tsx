import { ReactNode, createContext, useEffect, useMemo, useRef } from 'react';

import { CookieAttributes, CookiesStatic } from 'js-cookie';

export type CookieContextValue = {
  set(name: string, value: string): void;
  get(name: string): string | undefined;
  remove(name: string): void;
};

export type SetAction = {
  type: 'set';
  name: string;
  value: string;
};

export type RemoveAction = {
  type: 'remove';
  name: string;
};

export type Actions = (SetAction | RemoveAction)[];

export type CookieProviderProps = {
  cookies: Record<string, string>;
  children: ReactNode;
};

export type State = {
  state: Record<string, string>;
  actions: Actions;
};

export const CookieContext = createContext<CookieContextValue | null>(null);

export const options: CookieAttributes = {
  expires: 7,
  path: '/',
};

export function CookieProvider({ cookies, children }: CookieProviderProps) {
  const stateRef = useRef<State>({ state: cookies, actions: [] });
  const cookieRef = useRef<CookiesStatic | null>(null);
  const value = useMemo<CookieContextValue>(() => {
    return {
      set: (name: string, value: string) => {
        if (cookieRef.current === null) {
          stateRef.current.state[name] = value;
          stateRef.current.actions.push({ type: 'set', name, value });

          return;
        }

        cookieRef.current.set(name, value, options);
      },
      get: (name: string): string | undefined => {
        if (cookieRef.current === null) {
          return stateRef.current.state[name] ?? undefined;
        }

        return cookieRef.current.get(name) ?? undefined;
      },
      remove: (name: string) => {
        if (cookieRef.current === null) {
          delete stateRef.current.state[name];
          stateRef.current.actions.push({ type: 'remove', name });

          return;
        }

        cookieRef.current.remove(name);
      },
    };
  }, [stateRef, cookieRef]);

  useEffect(() => {
    if (window !== undefined) {
      import('js-cookie').then((module) => {
        cookieRef.current = module.default;

        stateRef.current.actions.forEach((action) => {
          if (action.type === 'set') {
            value.set(action.name, action.value);
          } else {
            value.remove(action.name);
          }
        });
      });
    }
  }, []);

  return (
    <CookieContext.Provider value={value}>{children}</CookieContext.Provider>
  );
}
