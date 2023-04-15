import { ReactNode } from 'react';

export type TitleProps = {
  children: ReactNode;
  icon: ReactNode;
};

export function Title({ children, icon }: TitleProps) {
  return (
    <h1 className="flex gap-2 items-center mb-5 mt-0 text-3xl font-semibold leading-normal">
      {children}
      {icon}
    </h1>
  );
}
