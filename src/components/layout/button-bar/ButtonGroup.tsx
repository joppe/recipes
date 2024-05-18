import { clsx } from 'clsx';
import { ReactNode } from 'react';

type ButtonGroupProps = {
  pullRight?: boolean;
  children: ReactNode;
};

export function ButtonGroup({ pullRight = false, children }: ButtonGroupProps) {
  return (
    <div className={clsx('flex items-center gap-2', pullRight && 'ml-auto ')}>
      {children}
    </div>
  );
}
