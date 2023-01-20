import { ReactNode } from 'react';

import { useFormContext } from '../context/useFormContext';
import { FormData } from '../types/FormData';
import { SubmitHandler } from '../types/SubmitHandler';

export interface FormElementProps<T extends FormData> {
  submitHandler: SubmitHandler<T>;
  children: ReactNode;
}

export const FormElement = <T extends FormData>({
  submitHandler,
  children,
}: FormElementProps<T>) => {
  const { handleSubmit } = useFormContext<T>();

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit((data: T) => {
        submitHandler(data);
      })}
    >
      {children}
    </form>
  );
};
