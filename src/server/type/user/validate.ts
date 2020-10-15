import { User } from '../../../types/user.type';
import { ValidationError } from '../../../types/validation-error.type';
import { ValidationResult } from '../../../types/validation-result.type';
import { roles } from './roles';

function isValidName(name: string): boolean {
    return (
        name !== undefined &&
        name.trim() !== '' &&
        name.length >= 2 &&
        name.length < 40
    );
}

function isValidEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return re.test(email);
}

function isValidPassword(password: string): boolean {
    return (
        password !== undefined &&
        password.trim() !== '' &&
        password.length >= 6 &&
        password.length < 40
    );
}

function isValidRole(role: string): boolean {
    return roles.indexOf(role) > -1;
}

export function validate(user: User): ValidationResult<User> {
    const error: ValidationError<User> = {
        name: isValidName(user.name),
        email: isValidEmail(user.email),
        password: isValidPassword(user.password),
        role: isValidRole(user.role),
    };
    const valid = Object.keys(error).every((key: string) => {
        return error[key as keyof User];
    });
    if (valid) {
        return {
            isValid: true,
        };
    }

    return {
        isValid: false,
        error,
    };
}
