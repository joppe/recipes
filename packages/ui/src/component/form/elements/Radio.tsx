import { useField } from '../context/useField';
import { Validator } from '../validators';

export interface RadioProps {
  name: string;
  id: string;
  value: string;
  checked?: boolean;
  validators?: Validator[];
}
export const Radio = ({
  name,
  id,
  value,
  checked = false,
  validators = [],
}: RadioProps) => {
  const ref = useField(name, validators);

  return (
    <input
      ref={ref}
      type="radio"
      name={name}
      value={value}
      id={id}
      defaultChecked={checked}
      className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
    />
  );
};
