import { ReactNode } from 'react';

import { useAuth } from '../auth/useAuth';

type NavigationProps = {
  children: ReactNode;
};

export function Navigation({ children }: NavigationProps) {
  const { user } = useAuth();

  return (
    <div className="w-full p-2 fixed top-0 flex justify-between shadow-md">
      <div>{user?.name}</div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
