import {
  ForwardedRef,
  RefObject,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { useField } from '../form/context/useField';

export type SelectedProps = {
  name: string;
  value?: string;
};

export type SelectedRef = {
  update(value: string): void;
};

export const Selected = forwardRef(
  ({ name, value = '' }: SelectedProps, ref: ForwardedRef<SelectedRef>) => {
    const inputRef = useField(name);

    useImperativeHandle(ref, () => {
      return {
        update: (value: string) => {
          if (inputRef.current !== null) {
            inputRef.current.value = value;
            inputRef.current.dispatchEvent(new Event('blur'));
          }
        },
      };
    });

    return (
      <input
        ref={inputRef as RefObject<HTMLInputElement>}
        type="hidden"
        name=""
        value={value}
      />
    );
  },
);
