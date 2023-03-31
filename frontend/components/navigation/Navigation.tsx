import { ReactNode } from 'react';

import { useAuth } from '../auth/useAuth';

type NavigationProps = {
  children: ReactNode;
};

export function Navigation({ children }: NavigationProps) {
  const { user } = useAuth();

  return (
    <div className="w-full p-2 fixed flex justify-between">
      <div>{user?.name}</div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
