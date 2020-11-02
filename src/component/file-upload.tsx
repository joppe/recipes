import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useRef, useState } from 'react';

import { BASE_URL, BUCKET_NAME } from '../config/cloud-storage';
import { RegisterReference } from '../hook/use-form';

type Props = {
    id: string;
    name: string;
    label: string;
    value?: string | undefined;
    isImage?: boolean;
    className: string;
    error: string | undefined;
    registerField(): RegisterReference;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        preview: {
            position: 'relative',
        },
        image: {
            width: '200px',
            height: '200px',
            objectFit: 'cover',
        },
    }),
);

function getImagePath(fileName: string): string {
    return `${BASE_URL}/${BUCKET_NAME}/${fileName}`;
}

export function FileUpload(props: Props): JSX.Element {
    const classes = useStyles();
    const [value, setValue] = useState<string | undefined>(props.value);
    const [remove, setRemove] = useState(false);
    const registerField = props.registerField();
    const input = useRef<HTMLInputElement>(null);
    const inputProps = props.isImage
        ? {
              accept: 'accept="image/png, image/jpeg"',
          }
        : {};

    useEffect((): void => {
        registerField(input.current);
    }, [input]);

    function updateValue(files: FileList | null): void {
        setRemove(true);

        if (files === null || files.length === 0) {
            return setValue('');
        }

        if (!props.isImage) {
            return setValue(files[0].name);
        }

        const reader = new FileReader();

        reader.onload = (): void => {
            setValue(reader.result as string);
        };

        reader.readAsDataURL(files[0]);
    }

    function renderImage(): JSX.Element {
        const src =
            value === props.value ? getImagePath(value as string) : value;

        return (
            <img
                src={src}
                alt={`Preview of ${props.name}`}
                className={classes.image}
            />
        );
    }

    function renderPath(): JSX.Element {
        return <span>{value}</span>;
    }

    function renderPreview() {
        if (!value) {
            return null;
        }

        const preview = props.isImage ? renderImage() : renderPath();

        return (
            <div className={classes.preview}>
                {preview}

                <IconButton
                    aria-label="delete"
                    onClick={(): void => {
                        if (input.current) {
                            input.current.value = '';
                        }

                        setValue(undefined);
                        setRemove(true);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        );
    }

    function renderHiddenFields(): JSX.Element | null {
        if (!props.value) {
            return null;
        }

        if (remove) {
            return (
                <input
                    type="hidden"
                    name={`DELETE__${props.name}`}
                    value={props.value}
                    ref={props.registerField()}
                />
            );
        }

        return (
            <input
                type="hidden"
                name={props.name}
                value={props.value}
                ref={props.registerField()}
            />
        );
    }

    return (
        <>
            {renderHiddenFields()}
            {renderPreview()}

            <TextField
                className={props.className}
                autoFocus
                margin="dense"
                id={props.id}
                name={`UPLOAD__${props.name}`}
                label={props.label}
                type="file"
                error={props.error !== undefined}
                fullWidth
                required={true}
                onChange={(value) => {
                    updateValue((value.target as HTMLInputElement).files);
                }}
                inputProps={inputProps}
                inputRef={input}
            />
        </>
    );
}
