import { Meal } from '../../../types/meal.type';
import { ValidationError } from '../../../types/validation-error.type';
import { ValidationResult } from '../../../types/validation-result.type';
import { isDefined } from '../../validator/is-defined';

async function isValidName(name: string): Promise<string | undefined> {
    if (!isDefined(name)) {
        return 'NO_DEFINED';
    }

    if (name.length > 100) {
        return 'TO_LONG';
    }
}

export async function validate(meal: Meal): Promise<ValidationResult<Meal>> {
    const error: ValidationError<Meal> = {
        name: await isValidName(meal.name),
    };
    const valid = Object.keys(error).every((key: string) => {
        return error[key as keyof Meal] === undefined;
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
