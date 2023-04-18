import { ReactNode } from 'react';

export type LabelProps = {
  id: string;
  children: ReactNode;
};

export function Label({ children, id }: LabelProps): JSX.Element {
  return (
    <label htmlFor={id} className="inline-block mb-2 text-gray-700">
      {children}
    </label>
  );
}
