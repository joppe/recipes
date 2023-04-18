import { RefObject } from 'react';

import { useField } from '../context/useField';
import { Validator } from '../types';

export type InputProps<T> = {
  name: string;
  id: string;
  type?: 'text' | 'password' | 'email' | 'number';
  value?: T;
  validators?: Validator[];
};

export function Input({
  name,
  id,
  value = '',
  type = 'text',
  validators = [],
}: InputProps<string>): JSX.Element {
  const ref = useField(name, validators);

  return (
    <input
      ref={ref as RefObject<HTMLInputElement>}
      type={type}
      name={name}
      id={id}
      defaultValue={value}
      className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
    />
  );
}
