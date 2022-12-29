import { ReactNode } from 'react';

export type RadioGroupProps = {
  title: string;
  children: ReactNode;
};

export const RadioGroup = ({ title, children }: RadioGroupProps) => {
  return (
    <fieldset className="flex flex-col">
      <legend className="mb-2 text-gray-700 font-bold">{title}</legend>
      {children}
    </fieldset>
  );
};
