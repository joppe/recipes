import { ReactNode } from 'react';

type MenuItemProps = {
  children: ReactNode;
  url: string;
  isActive?: boolean;
};

export function MenuItem({ children, url, isActive = false }: MenuItemProps) {
  return (
    <li>
      <a href={url}>{children}</a>
    </li>
  );
}
