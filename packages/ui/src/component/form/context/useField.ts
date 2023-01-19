import { useEffect, useRef } from 'react';

import { FormData } from './types';
import { useFormContext } from './useFormContext';

import { Validator } from '../validators';

export const useField = <T extends FormData>(
  name: keyof T,
  validators: Validator[] = [],
) => {
  const { register, unregister } = useFormContext<T>();
  const ref = useRef(null);

  useEffect(() => {
    const registerField = register(name, validators);

    registerField(ref.current);

    return () => {
      unregister(name);
    };
  }, []);

  return ref;
};
