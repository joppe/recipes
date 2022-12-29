import { ReactNode } from 'react';

export interface ButtonProps {
  type?: 'button' | 'reset' | 'submit';
  children: ReactNode;
}
export const Button = ({ type = 'button', children }: ButtonProps) => {
  return (
    <button
      type={type}
      className="px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
    >
      {children}
    </button>
  );
};
