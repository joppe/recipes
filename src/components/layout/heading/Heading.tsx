import { ReactNode } from 'react';

export type HeadingProps = {
  children: ReactNode;
};

export function Heading({ children }: HeadingProps) {
  return <div className="flex flex-col space-y-1.5 p-6">{children}</div>;
}
