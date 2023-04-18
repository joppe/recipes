import { FieldValue, Validator } from '../types';

export function maxLength(length: number, message: string): Validator {
  return (value: FieldValue): Promise<string | null> => {
    return Promise.resolve(
      value === undefined || String(value).length <= length ? null : message,
    );
  };
}
