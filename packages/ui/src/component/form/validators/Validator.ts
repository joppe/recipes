import { FieldValue } from '../types/FieldValue';

export type Validator = (value: FieldValue) => Promise<string | null>;
