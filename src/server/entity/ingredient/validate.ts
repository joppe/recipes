import { Ingredient } from '../../../types/ingredient.type';
import { ValidationError } from '../../../types/validation-error.type';
import { ValidationResult } from '../../../types/validation-result.type';
import { alreadyExists } from '../../validator/already-exists';
import { isDefined } from '../../validator/is-defined';
import { IngredientModel } from './model';

async function isValidName(
    name: string,
    id: string | undefined,
): Promise<string | undefined> {
    if (!isDefined(name)) {
        return 'NO_DEFINED';
    }

    if (name.length > 100) {
        return 'TO_LONG';
    }

    const exists = await alreadyExists(IngredientModel, 'name', name, id);

    if (exists) {
        return 'ALREADY_EXISTS';
    }
}

export async function validate(
    ingredient: Ingredient,
): Promise<ValidationResult<Ingredient>> {
    const error: ValidationError<Ingredient> = {
        name: await isValidName(ingredient.name, ingredient._id),
    };
    const valid = Object.keys(error).every((key: string) => {
        return error[key as keyof Ingredient] === undefined;
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
