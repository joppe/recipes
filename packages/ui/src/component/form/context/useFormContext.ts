import { useContext } from 'react';

import { FormContextValue } from '../types/FormContextValue';
import { FormData } from '../types/FormData';

import { FormContext } from './FormContext';

export const useFormContext = <T extends FormData>(): FormContextValue<T> => {
  const value = useContext(FormContext);

  if (value === null) {
    throw new Error('Unable to find context provider for FormContext');
  }

  return value as FormContextValue<T>;
};
