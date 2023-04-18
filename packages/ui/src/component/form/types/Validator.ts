import { FieldValue } from './FieldValue';

export type Validator = (value: FieldValue) => Promise<string | null>;
