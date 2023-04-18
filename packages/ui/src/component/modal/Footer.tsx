import { ReactNode } from 'react';

export type FooterProps = {
  children: ReactNode;
};

export function Footer({ children }: FooterProps): JSX.Element {
  return (
    <div className="flex flex-shrink-0 flex-wrap items-center gap-4 justify-end p-4 border-t border-gray-200 rounded-b-md">
      {children}
    </div>
  );
}
