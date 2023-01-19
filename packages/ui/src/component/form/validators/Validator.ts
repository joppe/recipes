import { FieldValue } from '../context/types';

export type Validator = (value: FieldValue) => Promise<string | null>;
