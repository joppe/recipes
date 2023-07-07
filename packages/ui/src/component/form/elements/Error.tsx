import { ReactNode } from 'react';

export type ErrorProps = {
  children: ReactNode;
};

export function Error({ children }: ErrorProps) {
  return <div className="my-2 text-red-600 text-sm">{children}</div>;
}
