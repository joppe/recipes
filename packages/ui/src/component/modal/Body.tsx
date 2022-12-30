import { ReactNode } from 'react';

export type BodyProps = {
  children: ReactNode;
};

export const Body = ({ children }: BodyProps) => {
  return <div className="relative p-4 overflow-y-auto">{children}</div>;
};
