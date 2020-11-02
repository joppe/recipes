import { User } from '../../../types/user.type';
import { ValidationError } from '../../../types/validation-error.type';
import { ValidationResult } from '../../../types/validation-result.type';
import { alreadyExists } from '../../validator/already-exists';
import { isDefined } from '../../validator/is-defined';
import { UserModel } from './model';
import { roles } from './roles';

function isValidName(name: string): string | undefined {
    if (!isDefined(name)) {
        return 'NO_DEFINED';
    }

    if (name.length > 40) {
        return 'TO_LONG';
    }
}

async function isValidEmail(
    email: string,
    id: string | undefined,
): Promise<string | undefined> {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!re.test(email)) {
        return 'INVALID';
    }

    const exists = await alreadyExists(UserModel, 'email', email, id);

    if (exists) {
        return 'ALREADY_EXISTS';
    }
}

function isValidPassword(password: string): string | undefined {
    if (!isDefined(password)) {
        return 'NO_DEFINED';
    }

    if (password.length < 6) {
        return 'TO_SHORT';
    }

    if (password.length > 40) {
        return 'TO_LONG';
    }
}

function isValidRole(role: string): string | undefined {
    if (roles.indexOf(role) === -1) {
        return 'INVALID';
    }
}

export async function validate(user: User): Promise<ValidationResult<User>> {
    const error: ValidationError<User> = {
        name: isValidName(user.name),
        email: await isValidEmail(user.email, user._id),
        password: isValidPassword(user.password),
        role: isValidRole(user.role),
    };
    const valid = Object.keys(error).every((key: string) => {
        return error[key as keyof User] === undefined;
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
