import { ReactNode } from 'react';

import { FormContextProvider } from './context/FormContext';
import { FormElement } from './elements';

export interface FormProps {
  children: ReactNode;
}
export const Form = ({ children }: FormProps) => {
  return (
    <FormContextProvider>
      <FormElement>{children}</FormElement>
    </FormContextProvider>
  );
};
