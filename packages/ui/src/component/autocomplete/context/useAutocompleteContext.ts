import { useContext } from 'react';

import { AutocompleteContext } from './AutocompleteContext';
import { AutocompleteContextValue } from './AutocompleteContextValue';

export function useAutocompleteContext(): AutocompleteContextValue {
  const context = useContext(AutocompleteContext);

  if (context === null) {
    throw new Error('Unable to find context provider for AutocompleteContext');
  }

  return context;
}
