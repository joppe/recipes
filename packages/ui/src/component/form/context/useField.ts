import { useEffect, useRef } from 'react';

import { useFormContext } from './useFormContext';

import { FieldElement } from '../types/FieldElement';
import { FormData } from '../types/FormData';
import { Validator } from '../validators';

export const useField = <T extends FormData>(
  name: keyof T,
  validators: Validator[] = [],
) => {
  const { register, unregister } = useFormContext<T>();
  const ref = useRef<FieldElement>(null);

  useEffect(() => {
    const registerField = register(name, validators);

    registerField(ref.current);

    return () => {
      unregister(name);
    };
  }, []);

  return ref;
};
