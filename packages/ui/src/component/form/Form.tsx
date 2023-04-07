import { ReactNode } from 'react';

import { FormContextProvider } from './context/FormContext';
import { FormElement } from './elements';
import { FormData } from './types/FormData';
import { SubmitHandler } from './types/SubmitHandler';

export type FormProps<T extends FormData> = {
  submitHandler: SubmitHandler<T>;
  children: ReactNode;
};

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
