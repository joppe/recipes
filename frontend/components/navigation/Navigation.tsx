import { ReactNode } from 'react';

import { useAuth } from '../auth/useAuth';

type NavigationProps = {
  children: ReactNode;
};

export function Navigation({ children }: NavigationProps) {
  const { user } = useAuth();

  return (
    <div className="w-full fixed top-0 shadow-md bg-white">
      <div className="max-w-xl mx-auto p-2 flex justify-between">
        <div>{user?.name}</div>
        <div className="flex gap-2">{children}</div>
      </div>
    </div>
  );
}
