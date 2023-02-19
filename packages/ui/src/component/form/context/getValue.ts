import { FieldElement } from '../types/FieldElement';
import { FieldValue } from '../types/FieldValue';

export const isInputField = (
  field: FieldElement,
): field is HTMLInputElement => {
  return field.type !== undefined;
};

export const isRadioField = (
  fields: FieldElement[],
): fields is HTMLInputElement[] => {
  return fields[0].type === 'radio';
};

export const getRadioValue = (fields: HTMLInputElement[]): FieldValue => {
  const checked = fields.find((field) => field.checked);

  return checked?.value ?? null;
};

export const getInputValue = (field: HTMLInputElement): FieldValue => {
  if (field.disabled) {
    return null;
  }

  switch (field.type) {
    case 'checkbox':
      return field.checked;
    case 'radio':
      return field.checked ? field.value : null;
    case 'number':
      return field.valueAsNumber;
    default:
      return field.value;
  }
};

export const getValue = (fields: FieldElement[]): FieldValue => {
  if (isRadioField(fields)) {
    return getRadioValue(fields);
  }

  const field = fields[0];

  if (isInputField(field)) {
    return getInputValue(field);
  }

  return field.value;
};
