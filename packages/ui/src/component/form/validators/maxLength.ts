import { FieldValue } from '../types/FieldValue';

import { Validator } from './Validator';

export const maxLength = (length: number, message: string): Validator => {
  return (value: FieldValue): Promise<string | null> => {
    return Promise.resolve(
      value === undefined || String(value).length <= length ? null : message,
    );
  };
};
