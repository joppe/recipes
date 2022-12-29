import { ReactNode } from 'react';

export interface LabelProps {
  id: string;
  children: ReactNode;
}
export const Label = ({ children, id }: LabelProps) => {
  return (
    <label htmlFor={id} className="inline-block mb-2 text-gray-700">
      {children}
    </label>
  );
};
