import { RefObject } from 'react';

import { useField } from '../context/useField';
import { Validator } from '../validators';

export type Option = {
  id: string;
  text: string;
};

export type SelectProps = {
  name: string;
  id: string;
  options: Option[];
  selected?: string;
  validators?: Validator[];
};
export const Select = ({
  name,
  id,
  options,
  selected,
  validators = [],
}: SelectProps) => {
  const ref = useField(name, validators);

  return (
    <select
      id={id}
      name={name}
      ref={ref as RefObject<HTMLSelectElement>}
      defaultValue={selected}
      className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    >
      {options.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.text}
          </option>
        );
      })}
    </select>
  );
};
