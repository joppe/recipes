import { Unit } from '../../../types/unit.type';
import { ValidationError } from '../../../types/validation-error.type';
import { ValidationResult } from '../../../types/validation-result.type';

/**
 * @todo
 * Function should return an error code when not valid
 * Separate validators
 */

function isValidName(name: string): boolean {
    return (
        name !== undefined &&
        name.trim() !== '' &&
        name.length >= 1 &&
        name.length < 40
    );
}

function isValidAbbreviation(abbreviation: string): boolean {
    return (
        abbreviation !== undefined &&
        abbreviation.trim() !== '' &&
        abbreviation.length >= 1 &&
        abbreviation.length < 40
    );
}

export function validate(unit: Unit): ValidationResult<Unit> {
    const error: ValidationError<Unit> = {
        name: isValidName(unit.name),
        abbreviation: isValidAbbreviation(unit.abbreviation),
    };
    const valid = Object.keys(error).every((key: string) => {
        return error[key as keyof Unit];
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
