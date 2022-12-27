import { ChangeEvent, MutableRefObject } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CgArrowsV, CgCheck, CgClose } from 'react-icons/cg';

import { renderTarget } from '../../util/render-target/renderTarget';

export interface UseClickOutsideProps {
  ref: MutableRefObject<HTMLElement | null>;
  fn: () => void;
}

export const useClickOutside = ({ ref, fn }: UseClickOutsideProps) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const element = ref.current;

      if (element !== null && element.contains(event.target as HTMLElement)) {
        return;
      }

      fn();
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, fn]);
};

export interface AutocompleteOption {
  id: string;
  text: string;
}
export interface AutocompleteOptionsProps {
  position: Position;
  options: AutocompleteOption[];
  activeOption: string;
  onSelectHandler: (option: AutocompleteOption) => void;
  onCloseHandler: () => void;
}

export const AutocompleteOptions = ({
  position,
  options,
  activeOption,
  onSelectHandler,
  onCloseHandler,
}: AutocompleteOptionsProps) => {
  const container = useRef<HTMLDivElement | null>(null);

  useClickOutside({
    ref: container,
    fn: onCloseHandler,
  });

  return (
    <div
      className="absolute pt-3"
      ref={container}
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        width: `${position.width}px`,
      }}
    >
      <ol className="flex flex-col w-full border border-solid border-gray-300 rounded overflow-hidden text-gray-700 shadow-md">
        {options.map((option, index) => (
          <li key={index}>
            <button
              type="button"
              className={`flex flex-row justify-between w-full py-2 px-3 ${
                option.id === activeOption
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onSelectHandler(option)}
            >
              {option.text} - {option.id}
              {option.id === activeOption && <CgCheck size={24} />}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export type Position = {
  top: number;
  left: number;
  width: number;
};

export interface AutocompleteProps {
  minLength?: 2;
}

export const Autocomplete = ({ minLength = 2 }: AutocompleteProps) => {
  const container = useRef<HTMLDivElement>(null);
  const position = useRef<Position>({ top: 0, left: 0, width: 0 });
  const [value, setValue] = useState('');
  const selectedId = useRef<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const options = useRef<AutocompleteOption[]>([]);

  const updateValue = (newValue: string): void => {
    setValue(newValue);

    if (newValue.length >= minLength) {
      options.current = [
        {
          id: '1',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing',
        },
        {
          id: '2',
          text: 'Dignissimos aspernatur ducimus obcaecati expedita',
        },
        {
          id: '3',
          text: 'Omnis ipsum quo quas',
        },
        {
          id: '4',
          text: 'Blanditiis molestiae',
        },
        {
          id: '5',
          text: 'Fugiat dolores',
        },
      ];

      displayOptions();
    } else {
      hideOptions();
    }
  };

  const displayOptions = () => {
    if (container.current === null) {
      return;
    }

    const { left, top, height, width } =
      container.current.getBoundingClientRect();

    position.current = { top: top + height, left, width };
    setShowOptions(true);
  };

  const hideOptions = () => {
    setShowOptions(false);
  };

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    updateValue(event.target.value);
  };

  const selectOptionHandler = (option: AutocompleteOption): void => {
    updateValue(option.text);
    selectedId.current = option.id;
    hideOptions();
  };

  const toggleShowOptions = () => {
    if (showOptions) {
      hideOptions();
    } else {
      displayOptions();
    }
  };

  return (
    <>
      <div className="relative flex flex-col" ref={container}>
        <input type="hidden" name="" value={selectedId.current ?? ''} />
        <label className='inline-block mb-2 text-gray-700"'>Recipe</label>
        <div className="flex flex-row items-center w-full border border-solid border-gray-300 rounded overflow-hidden">
          <input
            type="text"
            className="flex-grow border-none py-2 px-3 pr-10 text-base font-normal text-gray-700 outline-none"
            placeholder="Search recipes"
            value={value}
            onChange={inputChangeHandler}
          />
          {selectedId.current && (
            <CgCheck size={24} className="mr-3 text-gray-400" />
          )}
          {value.length >= minLength && (
            <button
              type="button"
              className="mr-3 text-gray-400"
              aria-label="Remove text"
              onClick={() => updateValue('')}
            >
              <CgClose />
            </button>
          )}
          {options.current.length > 0 && (
            <button
              type="button"
              className="mr-3 text-gray-400"
              aria-label="Show options"
              onClick={(event) => {
                event.stopPropagation();

                toggleShowOptions();
              }}
            >
              <CgArrowsV />
            </button>
          )}
        </div>
      </div>
      {showOptions &&
        createPortal(
          <AutocompleteOptions
            activeOption={selectedId.current ?? ''}
            options={options.current}
            onCloseHandler={hideOptions}
            onSelectHandler={selectOptionHandler}
            position={position.current}
          />,
          renderTarget('autocomplete'),
        )}
    </>
  );
};
