import { ReactNode } from 'react';

export type FormFieldProps = {
  label: ReactNode;
  input: ReactNode;
  error?: ReactNode;
  type?: 'row' | 'col';
  reverse?: boolean;
};

export function FormField({
  label,
  input,
  error,
  type = 'row',
  reverse = false,
}: FormFieldProps): JSX.Element {
  return (
    <div className={`flex  ${type === 'row' ? 'flex-col' : 'flex-row'}`}>
      <div className={`${reverse ? 'order-2' : 'order-1'}`}>{label}</div>
      <div className={`${reverse ? 'order-1' : 'order-2'}`}>{input}</div>
      {error && <div className="order-3">{error}</div>}
    </div>
  );
}
