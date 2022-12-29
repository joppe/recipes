import { ReactNode } from 'react';

import { FieldValue } from '../context/FormContext';
import { useForm } from '../context/useForm';

export interface FormElementProps {
  children: ReactNode;
}
export const FormElement = ({ children }: FormElementProps) => {
  const { handleSubmit, errors } = useForm();

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit((data: Record<string, FieldValue>) => {
        console.log('>>', data);
      })}
    >
      {children}
      {Object.keys(errors).length > 0 && (
        <div>
          {Object.keys(errors).map((field) => (
            <div key={field}>
              {field} {errors[field]}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};
