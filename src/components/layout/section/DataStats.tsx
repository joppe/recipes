import { ReactNode } from 'react';

type DataStatsProps = {
  children: ReactNode;
};

export function DataStats({ children }: DataStatsProps) {
  return (
    <div className="flex items-center p-6 pt-0">
      <div className="text-xs text-muted-foreground">{children}</div>
    </div>
  );
}
