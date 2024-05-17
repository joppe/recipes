import { ReactNode } from 'react';

export type HeadingDescriptionProps = {
  children: ReactNode;
};

export function HeadingDescription({ children }: HeadingDescriptionProps) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}
