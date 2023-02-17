import { ReactNode } from 'react';

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
