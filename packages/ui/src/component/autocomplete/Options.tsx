import { useRef } from 'react';

import { useClickOutside } from '../../hook/outside-click';
import { useAutocompleteContext } from './context/useAutocompleteContext';
import { Option } from './Option';

export const Options = () => {
  const {
    hideOptions,
    optionsVisible,
    reference,
    options,
    selectOption,
    selectedId,
  } = useAutocompleteContext();
  const container = useRef<HTMLDivElement | null>(null);

  useClickOutside({
    ref: container,
    onClickOutside: hideOptions,
  });

  return (
    <div
      className={`absolute pt-3 ${optionsVisible ? 'block' : 'hidden'}`}
      ref={container}
      style={{
        left: `${reference.x}px`,
        top: `${reference.y + reference.height}px`,
        width: `${reference.width}px`,
      }}
    >
      <ol className="flex flex-col w-full border border-solid border-gray-300 rounded overflow-hidden text-gray-700 shadow-md">
        {options.map((option, index) => (
          <Option
            key={index}
            option={option}
            selectedId={selectedId}
            onSelectHandler={selectOption}
          />
        ))}
      </ol>
    </div>
  );
};
