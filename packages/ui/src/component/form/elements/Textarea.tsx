import { useField } from '../context/useField';
import { Validator } from '../validators';

export interface TextareaProps {
  name: string;
  id: string;
  value?: string;
  validators?: Validator[];
}
export const Textarea = ({
  name,
  id,
  value = '',
  validators = [],
}: TextareaProps) => {
  const ref = useField(name, validators);

  return (
    <textarea
      ref={ref}
      name={name}
      id={id}
      defaultValue={value}
      className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    />
  );
};
