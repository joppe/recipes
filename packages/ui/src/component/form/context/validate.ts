import { FieldValue } from '../types/FieldValue';
import { Validator } from '../validators';

export const validate = async (
  value: FieldValue,
  validators: Validator[],
): Promise<string | null> => {
  for (const validator of validators) {
    const error = await validator(value);

    if (error !== null) {
      return error;
    }
  }

  return null;
};
