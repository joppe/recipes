import { ReactNode } from 'react';

export interface FormFieldProps {
  label: ReactNode;
  input: ReactNode;
  type?: 'row' | 'col';
  reverse?: boolean;
}

export const FormField = ({
  label,
  input,
  type = 'row',
  reverse = false,
}: FormFieldProps) => {
  return (
    <div className={`flex  ${type === 'row' ? 'flex-col' : 'flex-row'}`}>
      <div className={`${reverse ? 'order-2' : 'order-1'}`}>{label}</div>
      <div className={`${reverse ? 'order-1' : 'order-2'}`}>{input}</div>
    </div>
  );
};
