import { FieldElement, FieldValue } from './types';

export const isInputField = (
  field: FieldElement,
): field is HTMLInputElement => {
  return field.type !== undefined;
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

export const getValue = (field: FieldElement): FieldValue => {
  if (isInputField(field)) {
    return getInputValue(field);
  }

  return field.value;
};
