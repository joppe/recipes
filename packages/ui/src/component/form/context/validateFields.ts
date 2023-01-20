import { validate } from './validate';

import { FieldRegistry } from '../types/FieldRegistry';
import { FormData } from '../types/FormData';
import { FormErrors } from '../types/FormErrors';

export const validateFields = async <T extends FormData>(
  fields: FieldRegistry<T>,
): Promise<FormErrors<T>> => {
  const errors: FormErrors<T> = {};

  for (const fieldName in fields) {
    const field = fields[fieldName];

    if (field !== undefined) {
      const error = await validate(field.value, field.validators);

      if (error) {
        errors[fieldName] = error;
      }
    }
  }

  return errors;
};
