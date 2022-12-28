import { MutableRefObject, useEffect } from 'react';

export interface UseClickOutsideProps {
  ref: MutableRefObject<HTMLElement | null>;
  onClickOutside: () => void;
}

export const useClickOutside = ({
  ref,
  onClickOutside,
}: UseClickOutsideProps) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const element = ref.current;

      if (element !== null && element.contains(event.target as HTMLElement)) {
        return;
      }

      onClickOutside();
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, onClickOutside]);
};
