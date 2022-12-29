import { ReactNode } from 'react';

import { FormContextProvider } from './context/FormContext';
import { FormElement } from './elements/FormElement';

// flex flex-col w-full max-w-2xl p-8 rounded-lg radius-m bg-white shadow-lg

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
