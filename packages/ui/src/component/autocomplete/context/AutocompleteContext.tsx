import { ReactNode, createContext, useReducer } from 'react';

import { DataLoader } from '../../../types';
import { AutocompleteOption } from '../types/AutocompleteOption';
import { DataLoaderResponse } from '../types/DataLoaderResponse';
import { Rectangle } from '../types/Rectangle';

import { AutocompleteContextValue } from './AutocompleteContextValue';
import { initialState, reducer } from './reducer';

export type AutocompleteContextProviderProps = {
  dataLoader: DataLoader<DataLoaderResponse>;
  minLength: number;
  children: ReactNode;
};

export const AutocompleteContext =
  createContext<AutocompleteContextValue | null>(null);

export function AutocompleteContextProvider({
  dataLoader,
  minLength,
  children,
}: AutocompleteContextProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue: AutocompleteContextValue = {
    ...state,
    showOptions: () => {
      dispatch({ type: 'SHOW_OPTIONS' });
    },
    hideOptions: () => {
      dispatch({ type: 'HIDE_OPTIONS' });
    },
    toggleOptions: () => {
      dispatch({ type: 'TOGGLE_OPTIONS' });
    },
    setValue: (value: string) => {
      dispatch({ type: 'SET_VALUE', payload: value });

      if (value.length > minLength) {
        dataLoader.fetch(value).then((response) => {
          dispatch({ type: 'SET_OPTIONS', payload: response });
        });
      }
    },
    selectOption: (option: AutocompleteOption | null) => {
      dispatch({ type: 'SELECT_OPTION', payload: option });
    },
    setReference: (reference: Rectangle) => {
      dispatch({ type: 'SET_REFERENCE', payload: reference });
    },
  };

  return (
    <AutocompleteContext.Provider value={contextValue}>
      {children}
    </AutocompleteContext.Provider>
  );
}
