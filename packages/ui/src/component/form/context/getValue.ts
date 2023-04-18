import { FieldElement, FieldValue } from '../types';

export function isInputField(field: FieldElement): field is HTMLInputElement {
  return field.type !== undefined;
}

export function isRadioField(
  fields: FieldElement[],
): fields is HTMLInputElement[] {
  return fields[0].type === 'radio';
}

export function getRadioValue(fields: HTMLInputElement[]): FieldValue {
  const checked = fields.find((field) => field.checked);

  return checked?.value ?? null;
}

export function getInputValue(field: HTMLInputElement): FieldValue {
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
}

export function getValue(fields: FieldElement[]): FieldValue {
  if (isRadioField(fields)) {
    return getRadioValue(fields);
  }

  const field = fields[0];

  if (isInputField(field)) {
    return getInputValue(field);
  }

  return field.value;
}
