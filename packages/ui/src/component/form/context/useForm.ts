import { useContext } from 'react';

import { FormContext } from './FormContext';
import { FormContextValue } from './FormContextValue';

export const useForm = (): FormContextValue => {
  const context = useContext(FormContext);

  if (context === null) {
    throw new Error('Unable to find context provider for AutocompleteContext');
  }

  return context;
};
