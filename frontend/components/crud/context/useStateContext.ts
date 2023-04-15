import { useContext } from 'react';

import { StateContext, StateContextValue } from './StateContext';

export function useStateContext(): StateContextValue {
  const value = useContext(StateContext);

  if (value === null) {
    throw new Error('State context not found');
  }

  return value;
}
