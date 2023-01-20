import { FormData } from './FormData';
import { RegisteredField } from './RegisteredField';

export type FieldRegistry<T extends FormData> = {
  [Property in keyof T]?: RegisteredField<T[Property]>;
};
