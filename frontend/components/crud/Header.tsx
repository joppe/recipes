import { ReactNode } from 'react';

export type HeaderProps = {
  children: ReactNode;
};

export function Header({ children }: HeaderProps) {
  return <header className="px-6">{children}</header>;
}
