import { Validator } from '../validators/Validator';
import { FieldValue } from './FormContext';

export const validateField = async (
  value: FieldValue,
  validators: Validator[],
): Promise<string | null> => {
  let error = null;

  for (const validator of validators) {
    error = await validator(value);

    if (error !== null) {
      break;
    }
  }

  return error;
};
