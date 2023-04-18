import { ReactNode } from 'react';

import { FormContextProvider } from './context/FormContext';
import { FormElement } from './elements';
import { FormData, SubmitHandler } from './types';

export type FormProps<T extends FormData> = {
  submitHandler: SubmitHandler<T>;
  children: ReactNode;
};

export function Form<T extends FormData>({
  submitHandler,
  children,
}: FormProps<T>): JSX.Element {
  return (
    <FormContextProvider<T>>
      <FormElement submitHandler={submitHandler}>{children}</FormElement>
    </FormContextProvider>
  );
}
