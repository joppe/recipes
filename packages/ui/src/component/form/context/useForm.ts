import { useFormContext } from './useFormContext';

import { FormContextValue } from '../types/FormContextValue';
import { FormData } from '../types/FormData';

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
