import { ChangeEvent, useLayoutEffect, useRef } from 'react';
import { CgArrowsV, CgCheck, CgClose } from 'react-icons/cg';

import { useAutocompleteContext } from './context/useAutocompleteContext';

export const Input = () => {
  const container = useRef<HTMLDivElement>(null);
  const {
    selectedId,
    value,
    setValue,
    minLength,
    options,
    showOptions,
    toggleOptions,
    setReference,
  } = useAutocompleteContext();

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  useLayoutEffect(() => {
    if (container.current === null) {
      return;
    }

    const { top, left, width, height } =
      container.current.getBoundingClientRect();

    setReference({ x: left, y: top, width, height });
  }, []);

  return (
    <div className="flex flex-col relative" ref={container}>
      <input type="hidden" name="" value={selectedId ?? ''} />
      <label className='inline-block mb-2 text-gray-700"'>Recipe</label>
      <div className="flex flex-row items-center w-full border border-solid border-gray-300 rounded overflow-hidden">
        <input
          type="text"
          className="flex-grow border-none py-2 px-3 pr-10 text-base font-normal text-gray-700 outline-none"
          placeholder="Search recipes"
          value={value}
          onChange={inputChangeHandler}
          onFocus={showOptions}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
        {selectedId && <CgCheck size={24} className="mr-3 text-gray-400" />}
        {value.length >= minLength && (
          <button
            type="button"
            className="mr-3 text-gray-400"
            aria-label="Remove text"
            onClick={() => setValue('')}
          >
            <CgClose />
          </button>
        )}
        {options.length > 0 && (
          <button
            type="button"
            className="mr-3 text-gray-400"
            aria-label="Show options"
            onClick={(event) => {
              event.stopPropagation();

              toggleOptions();
            }}
          >
            <CgArrowsV />
          </button>
        )}
      </div>
    </div>
  );
};
