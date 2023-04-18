import { ReactNode } from 'react';

import { useFormContext } from '../context/useFormContext';
import { FormData, SubmitHandler } from '../types';

export type FormElementProps<T extends FormData> = {
  submitHandler: SubmitHandler<T>;
  children: ReactNode;
};

export function FormElement<T extends FormData>({
  submitHandler,
  children,
}: FormElementProps<T>): JSX.Element {
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
}
