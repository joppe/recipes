import { ReactNode } from 'react';

import { FormData, SubmitHandler } from '../context/types';
import { useFormContext } from '../context/useFormContext';

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
