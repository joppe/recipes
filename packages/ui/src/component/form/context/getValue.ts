import { FieldValue } from './FormContext';

export type FieldType =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export const isInputField = (field: FieldType): field is HTMLInputElement => {
  return field.type !== undefined;
};

export const getInputValue = (field: HTMLInputElement): FieldValue => {
  switch (field.type) {
    case 'checkbox':
      return field.checked;
    case 'radio':
      return field.checked ? field.value : undefined;
    case 'number':
      return field.valueAsNumber;
    default:
      return field.value;
  }
};

export const getValue = (field: FieldType): FieldValue => {
  if (isInputField(field)) {
    return getInputValue(field);
  }

  return field.value;
};
