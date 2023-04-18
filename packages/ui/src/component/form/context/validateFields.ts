import { FieldRegistry, FormData, FormErrors } from '../types';

import { validate } from './validate';

export async function validateFields<T extends FormData>(
  fields: FieldRegistry<T>,
): Promise<FormErrors<T>> {
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
}
