import { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
};

export function Section({ children }: SectionProps) {
  return (
    <section className="rounded-lg border bg-card text-card-foreground shadow-sm">
      {children}
    </section>
  );
}
