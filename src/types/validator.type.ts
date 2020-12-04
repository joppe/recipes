import { ValidationResult } from './validation-result.type';

export type Validator<T> = (target: T) => Promise<ValidationResult<T>>;
