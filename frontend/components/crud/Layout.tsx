import { ReactNode } from 'react';

import { Logout } from '../navigation/Logout';
import { Menu } from '../navigation/Menu';
import { Navigation } from '../navigation/Navigation';

export type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation>
        <Logout />
        <Menu />
      </Navigation>

      <section className="mt-8 pt-4">{children}</section>
    </>
  );
}
