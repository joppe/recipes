import { RefObject, useEffect, useRef } from 'react';

import { FieldElement, FormData, Validator } from '../types';

import { useFormContext } from './useFormContext';

export function useField<T extends FormData>(
  name: keyof T,
  validators: Validator[] = [],
): RefObject<FieldElement> {
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
}
