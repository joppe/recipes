import { Unit } from '../../../types/unit.type';
import { ValidationError } from '../../../types/validation-error.type';
import { ValidationResult } from '../../../types/validation-result.type';
import { alreadyExists } from '../../validator/already-exists';
import { isDefined } from '../../validator/is-defined';
import { UnitModel } from './model';

async function isValidName(
    name: string,
    id: string | undefined,
): Promise<string | undefined> {
    if (!isDefined(name)) {
        return 'NO_DEFINED';
    }

    if (name.length > 40) {
        return 'TO_LONG';
    }

    const exists = await alreadyExists(UnitModel, 'name', name, id);

    if (exists) {
        return 'ALREADY_EXISTS';
    }
}

async function isValidAbbreviation(
    abbreviation: string,
    id: string | undefined,
): Promise<string | undefined> {
    if (!isDefined(abbreviation)) {
        return 'NO_DEFINED';
    }

    if (abbreviation.length > 10) {
        return 'TO_LONG';
    }

    const exists = await alreadyExists(
        UnitModel,
        'abbreviation',
        abbreviation,
        id,
    );

    if (exists) {
        return 'ALREADY_EXISTS';
    }
}

export async function validate(unit: Unit): Promise<ValidationResult<Unit>> {
    const error: ValidationError<Unit> = {
        name: await isValidName(unit.name, unit._id),
        abbreviation: await isValidAbbreviation(unit.abbreviation, unit._id),
    };
    const valid = Object.keys(error).every((key: string) => {
        return error[key as keyof Unit] === undefined;
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
