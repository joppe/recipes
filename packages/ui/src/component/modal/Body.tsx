import { ReactNode } from 'react';

export type BodyProps = {
  children: ReactNode;
};

export function Body({ children }: BodyProps): JSX.Element {
  return <div className="relative p-4 overflow-y-auto">{children}</div>;
}
