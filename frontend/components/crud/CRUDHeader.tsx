import { ReactNode } from 'react';

type CRUDHeaderProps = {
  children: ReactNode;
};

export function CRUDHeader({ children }: CRUDHeaderProps) {
  return <header className="px-6">{children}</header>;
}
