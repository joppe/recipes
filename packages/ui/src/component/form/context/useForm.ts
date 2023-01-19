import { useContext } from 'react';

import { FormContext } from './FormContext';
import { FormContextValue, FormData } from './types';
import { useFormContext } from './useFormContext';

export type UseFormReturnValue<T extends FormData> = {
  errors: FormContextValue<T>['errors'];
};

export const useForm = <T extends FormData>(): UseFormReturnValue<T> => {
  const context = useFormContext<T>();

  if (context === null) {
    throw new Error('Unable to find context provider for FormContext');
  }

  const { errors } = context;

  return { errors };
};
