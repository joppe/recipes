import { Validator } from './Validator';

import { FieldValue } from '../types/FieldValue';

export const required = (message: string): Validator => {
  return (value: FieldValue): Promise<string | null> => {
    return Promise.resolve(
      value === undefined || String(value).length === 0 ? message : null,
    );
  };
};
