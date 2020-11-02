import React, { useState } from 'react';

type Validator = (val: Blob | string | undefined) => string | undefined;

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type RegistryEntry = {
    field: FormElement;
    validator?: Validator;
};

type Registry = {
    [id: string]: RegistryEntry;
};

type FieldErrors = { [fieldNAme: string]: string };

type RegisterReference = (field: FormElement | null) => void;

type SubmitHandler = (data: FormData) => void;

type OnSubmit = (event: React.FormEvent) => void;

type UseForm = {
    registerField(validator?: Validator): RegisterReference;
    handleSubmit(fn: SubmitHandler): OnSubmit;
    setErrors(err: FieldErrors): void;
    errors: FieldErrors;
};

function getValue(field: FormElement): Blob | string {
    if (field.type === 'file') {
        return (<HTMLInputElement>field).files?.item(0) ?? '';
    }

    return field.value;
}

export function useForm(): UseForm {
    const fields: Registry = {};
    const [errors, setErrors] = useState({});
    let count = 0;

    return {
        registerField(validator?: Validator): RegisterReference {
            count += 1;

            const id = `field-${count}`;

            return (field: FormElement | null): void => {
                // check for unmount
                if (field == null) {
                    delete fields[id];

                    return;
                }

                fields[id] = {
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

                Object.keys(fields).forEach((id: string): void => {
                    const fieldRegistry = fields[id];
                    const name = fieldRegistry.field.name;
                    const value = getValue(fieldRegistry.field);

                    data.append(name, value);

                    if (fieldRegistry.validator !== undefined) {
                        const msg = fieldRegistry.validator(value);

                        if (msg !== undefined) {
                            err[id] = msg;
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
