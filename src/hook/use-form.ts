import React, { useState } from 'react';

type Validator = (val: Blob | string | undefined) => string | undefined;

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type RegistryEntry = {
    field: FormElement;
    validator?: Validator;
};

type Registry = {
    [fieldName: string]: RegistryEntry;
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

    return {
        registerField(validator?: Validator): RegisterReference {
            /**
             * create a unique id
             * use the id as the key in the registry
             * store the id with the rest of the data in the fields registry
             * when field equals null remove from registry
             */
            return (field: FormElement | null): void => {
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

                /**
                 * if a field name ends with [] the value should be an array
                 */
                Object.keys(fields).forEach((fieldName: string): void => {
                    const fieldRegistry = fields[fieldName];
                    const value = getValue(fieldRegistry.field);
                    console.log(value);
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
