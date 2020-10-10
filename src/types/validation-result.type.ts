import { ValidationError } from './validation-error.type';

type FailResult<T> = {
    isValid: false;
    error: ValidationError<T>;
};

type SuccessResult = {
    isValid: true;
};

export type ValidationResult<T> = FailResult<T> | SuccessResult;
