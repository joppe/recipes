import { RefObject } from 'react';

import { useField } from '../context/useField';
import { Validator } from '../types';

export type CheckboxProps = {
  name: string;
  id: string;
  checked?: boolean;
  validators?: Validator[];
};

export function Checkbox({
  name,
  id,
  checked = false,
  validators = [],
}: CheckboxProps): JSX.Element {
  const ref = useField(name, validators);

  return (
    <input
      ref={ref as RefObject<HTMLInputElement>}
      type="checkbox"
      name={name}
      id={id}
      defaultChecked={checked}
      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
    />
  );
}
