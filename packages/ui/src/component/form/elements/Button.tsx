import { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'link';

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> & {
  variant?: ButtonVariant;
  icon?: boolean;
};

export function buttonClassNames(
  variant: ButtonVariant,
  icon: boolean,
): string {
  const spacing = icon ? 'p-2' : 'px-6 py-4';

  if (variant === 'primary') {
    return `${spacing} flex gap-2 items-center bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out`;
  }

  if (variant === 'secondary') {
    return `${spacing} flex gap-2 items-center bg-neutral-50 text-neutral-800 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-neutral-100 hover:shadow-lg focus:bg-neutral-100 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-neutral-100 active:shadow-lg transition duration-150 ease-in-out`;
  }

  return 'flex gap-2 items-center text-neutral-800 underline leading-tight hover:text-neutral-600 focus:text-neutral-600 transition duration-150 ease-in-out';
}

export const Button = ({
  variant = 'primary',
  type = 'button',
  icon = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button type={type} className={buttonClassNames(variant, icon)} {...props}>
      {children}
    </button>
  );
};
