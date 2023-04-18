import { FieldValue, Validator } from '../types';

export async function validate(
  value: FieldValue,
  validators: Validator[],
): Promise<string | null> {
  for (const validator of validators) {
    const error = await validator(value);

    if (error !== null) {
      return error;
    }
  }

  return null;
}
