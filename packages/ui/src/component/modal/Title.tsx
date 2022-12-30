import { ReactNode } from 'react';

export type TitleProps = {
  children: ReactNode;
};

export const Title = ({ children }: TitleProps) => {
  return (
    <div className="flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
      {children}
    </div>
  );
};
