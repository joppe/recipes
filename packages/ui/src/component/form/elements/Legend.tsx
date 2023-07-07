import { ReactNode } from 'react';

export type LegendProps = {
  children: ReactNode;
};

export function Legend({ children }: LegendProps): JSX.Element {
  return <legend className="px-2 bg-white text-gray-700">{children}</legend>;
}
