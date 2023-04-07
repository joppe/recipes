import { AnchorHTMLAttributes } from 'react';

import { ButtonVariant, buttonClassNames } from './Button';

export type LinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'className'
> & {
  variant?: ButtonVariant;
  icon?: boolean;
};

export const Link = ({
  variant = 'primary',
  icon = false,
  children,
  ...props
}: LinkProps) => {
  return (
    <a className={buttonClassNames(variant, icon)} {...props}>
      {children}
    </a>
  );
};
