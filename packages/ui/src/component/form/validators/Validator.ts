import { FieldValue } from '../context/FormContext';

export type Validator = (value: FieldValue) => Promise<string | null>;
