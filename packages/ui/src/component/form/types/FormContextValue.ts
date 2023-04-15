import { FormEvent } from 'react';

import { Validator } from '../validators';

import { FormData } from './FormData';
import { FormErrors } from './FormErrors';
import { RegisterField } from './RegisterField';
import { SubmitHandler } from './SubmitHandler';

export type FormContextValue<T extends FormData> = {
  errors: FormErrors<T>;
  handleSubmit: (
    handler: SubmitHandler<T>,
  ) => (event: FormEvent<HTMLFormElement>) => Promise<void>;
  register: (name: keyof T, validators: Validator[]) => RegisterField;
  unregister: (name: keyof T) => void;
};
