import { Validator } from '../validators';

import { FieldElement } from './FieldElement';
import { FieldValue } from './FieldValue';

export type RegisteredField<T extends FieldValue> = {
  ref: FieldElement[];
  value: T | null;
  error: string | null;
  validators: Validator[];
  unregister: () => void;
};
