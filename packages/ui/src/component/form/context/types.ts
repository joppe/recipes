import { FormEvent } from 'react';

import { Validator } from '../validators';

/**
 * Field Types
 */

export type FieldValue = string | number | boolean | null;

export type FieldElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

/**
 * Form Types
 */

export type FormData = Record<string, FieldValue>;

export type SubmitHandler<T extends FormData> = (
  data: T,
) => void | Promise<void>;

/**
 * Context Types
 */

export type RegisterField = (ref: FieldElement | null) => void;

export type FieldRegistry<T extends FormData> = {
  [Property in keyof T]?: RegisteredField<T[Property]>;
};

export type RegisteredField<T extends FieldValue> = {
  ref: FieldElement | null;
  value: T | null;
  error: string | null;
  validators: Validator[];
  unregister: () => void;
};

export type FormErrors<T extends FormData> = {
  [Property in keyof T]?: string;
};

export type FormContextValue<T extends FormData> = {
  errors: FormErrors<T>;
  handleSubmit: (
    handler: SubmitHandler<T>,
  ) => (event: FormEvent<HTMLFormElement>) => Promise<void>;
  register: (name: keyof T, validators: Validator[]) => RegisterField;
  unregister: (name: keyof T) => void;
};
