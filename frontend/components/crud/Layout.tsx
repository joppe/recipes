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

      <main className="mt-8 pt-4">
        <div className="max-w-xl mx-auto">{children}</div>
      </main>
    </>
  );
}
