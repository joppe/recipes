import { AnchorHTMLAttributes } from 'react';

import { ButtonVariant, buttonClassNames } from './Button';

export type LinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'className'
> & {
  variant?: ButtonVariant;
  icon?: boolean;
};

export function Link({
  variant = 'primary',
  icon = false,
  children,
  ...props
}: LinkProps): JSX.Element {
  return (
    <a className={buttonClassNames(variant, icon)} {...props}>
      {children}
    </a>
  );
}
