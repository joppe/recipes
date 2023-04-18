import { ReactNode } from 'react';

export type TitleProps = {
  children: ReactNode;
};

export function Title({ children }: TitleProps): JSX.Element {
  return (
    <div className="flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
      {children}
    </div>
  );
}
