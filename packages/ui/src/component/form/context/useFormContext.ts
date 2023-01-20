import { useContext } from 'react';

import { FormContext } from './FormContext';

import { FormContextValue } from '../types/FormContextValue';
import { FormData } from '../types/FormData';

export const useFormContext = <T extends FormData>(): FormContextValue<T> => {
  const value = useContext(FormContext);

  if (value === null) {
    throw new Error('Unable to find context provider for FormContext');
  }

  return value as FormContextValue<T>;
};
