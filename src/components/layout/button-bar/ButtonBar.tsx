import { ReactNode } from 'react';

type ButtonBarProps = {
  children: ReactNode;
};

export function ButtonBar({ children }: ButtonBarProps) {
  return <div className="flex items-center">{children}</div>;
}
