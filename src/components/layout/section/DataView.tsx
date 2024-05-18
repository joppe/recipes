import { ReactNode } from 'react';

type DataViewProps = {
  children: ReactNode;
};
export function DataView({ children }: DataViewProps) {
  return (
    <div className="p-6 pt-0">
      <div className="relative w-full overflow-auto">{children}</div>
    </div>
  );
}
