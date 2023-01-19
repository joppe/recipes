import { Validator } from './Validator';

import { FieldValue } from '../context/types';

export const maxLength = (length: number, message: string): Validator => {
  return (value: FieldValue): Promise<string | null> => {
    return Promise.resolve(
      value === undefined || String(value).length <= length ? null : message,
    );
  };
};
