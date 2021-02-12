import { ValidationResult } from '../../types/validation-result.type';

export type Validator<T> = (input: T) => Promise<ValidationResult<T>>;
