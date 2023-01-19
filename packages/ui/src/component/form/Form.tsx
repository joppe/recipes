import { ReactNode } from 'react';

import { FormContextProvider } from './context/FormContext';
import { FormData, SubmitHandler } from './context/FormContextValue';
import { FormElement } from './elements';

export interface FormProps<T extends FormData> {
  submitHandler: SubmitHandler<T>;
  children: ReactNode;
}

export const Form = <T extends FormData>({
  submitHandler,
  children,
}: FormProps<T>) => {
  return (
    <FormContextProvider<T>>
      <FormElement submitHandler={submitHandler}>{children}</FormElement>
    </FormContextProvider>
  );
};
