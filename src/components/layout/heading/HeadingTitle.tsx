import { ReactNode } from 'react';

export type HeadingTitleProps = {
  children: ReactNode;
};

export function HeadingTitle({ children }: HeadingTitleProps) {
  return (
    <h1 className="text-2xl font-semibold leading-none tracking-tight">
      {children}
    </h1>
  );
}
