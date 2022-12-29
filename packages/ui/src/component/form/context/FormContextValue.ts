import { FormEvent } from 'react';

import { Validator } from '../validators/Validator';
import { FieldValue } from './FormContext';

export type Register = (
  ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null,
) => void;

export type FormContextValue = {
  errors: Record<string, string>;
  handleSubmit: (
    handler: (data: Record<string, FieldValue>) => void,
  ) => (event: FormEvent<HTMLFormElement>) => Promise<void>;
  register: (name: string, validators: Validator[]) => Register;
};
