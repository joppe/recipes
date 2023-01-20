import { FieldElement } from './FieldElement';
import { FieldValue } from './FieldValue';

import { Validator } from '../validators';

export type RegisteredField<T extends FieldValue> = {
  ref: FieldElement | null;
  value: T | null;
  error: string | null;
  validators: Validator[];
  unregister: () => void;
};
