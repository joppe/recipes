import React, { useState } from 'react';

type Validator = (val: string) => string | undefined;

type RegistryEntry = {
    field: HTMLFormElement;
    validator?: Validator;
};

type Registry = {
    [fieldName: string]: RegistryEntry;
};

type FieldErrors = { [fieldNAme: string]: string };

type RegisterReference = (field: HTMLFormElement | null) => void;

type SubmitHandler = (data: FormData) => void;

type OnSubmit = (event: React.FormEvent) => void;

type UseForm = {
    registerField(validator?: Validator): RegisterReference;
    handleSubmit(fn: SubmitHandler): OnSubmit;
    setErrors(err: FieldErrors): void;
    errors: FieldErrors;
};

export function useForm(): UseForm {
    const fields: Registry = {};
    const [errors, setErrors] = useState({});

    return {
        registerField(validator?: Validator): RegisterReference {
            return (field: HTMLFormElement | null): void => {
                // check for unmount
                if (field == null) {
                    return;
                }

                fields[field.name] = {
                    field,
                    validator,
                };
            };
        },
        handleSubmit(fn: SubmitHandler): OnSubmit {
            return (event: React.FormEvent): void => {
                event.preventDefault();

                const data = new FormData();
                const err: FieldErrors = {};

                Object.keys(fields).forEach((fieldName: string): void => {
                    const fieldRegistry = fields[fieldName];
                    const value = fieldRegistry.field.value;

                    data.append(fieldName, value);

                    if (fieldRegistry.validator !== undefined) {
                        const msg = fieldRegistry.validator(value);

                        if (msg !== undefined) {
                            err[fieldName] = msg;
                        }
                    }
                });

                setErrors(err);

                fn(data);
            };
        },
        setErrors,
        errors,
    };
}
