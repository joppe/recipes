import { ReactNode } from 'react';

type CRUDTitleProps = {
  children: ReactNode;
  icon: ReactNode;
};

export function CRUDTitle({ children, icon }: CRUDTitleProps) {
  return (
    <h1 className="flex gap-2 items-center mb-5 mt-0 text-3xl font-semibold leading-normal">
      {children}
      {icon}
    </h1>
  );
}
