import { useContext } from 'react';

import { FormContext } from './FormContext';
import { FormContextValue, FormData } from './types';

export const useFormContext = <T extends FormData>(): FormContextValue<T> => {
  const value = useContext(FormContext);

  if (value === null) {
    throw new Error('Unable to find context provider for FormContext');
  }

  return value as FormContextValue<T>;
};
