import { ReactNode } from 'react';

export type RadioGroupProps = {
  title: string;
  children: ReactNode;
};

export function RadioGroup({ title, children }: RadioGroupProps): JSX.Element {
  return (
    <fieldset className="flex flex-col">
      <legend className="mb-2 text-gray-700 font-bold">{title}</legend>
      {children}
    </fieldset>
  );
}
