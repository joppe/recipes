import { CgCheck } from 'react-icons/cg';

import { AutocompleteOption } from './types/AutocompleteOption';

export type OptionProps = {
  option: AutocompleteOption;
  selectedId: string | null;
  onSelectHandler: (option: AutocompleteOption) => void;
};

export const Option = ({
  option,
  selectedId,
  onSelectHandler,
}: OptionProps) => {
  const isSelected = option.id === selectedId;

  return (
    <li>
      <button
        type="button"
        className={`flex flex-row justify-between w-full py-2 px-3 ${
          isSelected ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'
        }`}
        onClick={() => onSelectHandler(option)}
      >
        {option.text} - {option.id}
        {isSelected && <CgCheck size={24} />}
      </button>
    </li>
  );
};
