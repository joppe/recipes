import { useContext } from 'react';

import { FormContextValue, FormData } from '../types';

import { FormContext } from './FormContext';

export function useFormContext<T extends FormData>(): FormContextValue<T> {
  const value = useContext(FormContext);

  if (value === null) {
    throw new Error('Unable to find context provider for FormContext');
  }

  return value as FormContextValue<T>;
}
