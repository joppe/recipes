import { ReactNode } from 'react';

export type FieldsetProps = {
  children: ReactNode;
};

export function Fieldset({ children }: FieldsetProps): JSX.Element {
  return (
    <fieldset className="flex flex-col gap-4 p-5 rounded-lg border border-solid border-gray-400">
      {children}
    </fieldset>
  );
}
