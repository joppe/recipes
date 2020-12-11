import { TextField } from '@material-ui/core';
import React, { FormEvent, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { BASE_URL, BUCKET_NAME } from '../../config/cloud-storage';
import { FormContext, FormContextValue } from '../../context/form-context';
import { Image } from '../../types/image.type';
import { useStyles } from './style';

type Props = {
    image?: Image;
};

export function ImageForm(props: Props): JSX.Element {
    const classes = useStyles();
    const { registerField, errors } = useContext(
        FormContext,
    ) as FormContextValue;
    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileName, setFileName] = useState(props.image?.fileName);
    const [contentType, setContentType] = useState(props.image?.contentType);
    const [preview, setPreview] = useState<string | undefined>(() => {
        if (props.image) {
            return `${BASE_URL}/${BUCKET_NAME}/${props.image.fileName}`;
        }

        return undefined;
    });

    function onChange(event: FormEvent) {
        const files = (event.target as HTMLInputElement).files;

        if (files?.[0]) {
            const selected = files[0];

            setContentType(selected.type);
            setFileName(`${uuid()}-${selected.name}`);
            setFile(selected);

            const reader = new FileReader();

            reader.onload = (): void => {
                setPreview(reader.result as string);
            };

            reader.readAsDataURL(selected);
        }
    }

    return (
        <>
            {props.image && (
                <input
                    type="hidden"
                    name="_id"
                    value={props.image._id}
                    ref={registerField()}
                />
            )}

            <input
                type="hidden"
                name="fileName"
                value={fileName}
                ref={registerField()}
            />

            <input
                type="hidden"
                name="contentType"
                value={contentType}
                ref={registerField()}
            />

            <TextField
                className={classes.field}
                autoFocus
                margin="dense"
                name="name"
                label="Naam"
                defaultValue={props.image ? props.image.name : ''}
                type="text"
                error={errors['name'] !== undefined}
                fullWidth
                required
                inputRef={registerField()}
            />

            {preview && (
                <img src={preview} alt="" className={classes.preview} />
            )}

            {!props.image && (
                <TextField
                    className={classes.field}
                    autoFocus
                    margin="dense"
                    name="image"
                    label="Afbeelding"
                    type="file"
                    fullWidth
                    required
                    onChange={onChange}
                    inputRef={registerField()}
                />
            )}
        </>
    );
}
