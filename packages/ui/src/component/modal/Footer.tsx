import { ReactNode } from 'react';

export type FooterProps = {
  children: ReactNode;
};

export const Footer = ({ children }: FooterProps) => {
  return (
    <div className="flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
      {children}
    </div>
  );
};
