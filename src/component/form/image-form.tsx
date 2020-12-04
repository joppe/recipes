import { gql } from '@apollo/client';
import { Button, Card, CardContent, TextField } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { initializeApollo } from '../../apollo/apollo-client';
import { hydrate } from '../../data/hydrate';
import { useForm } from '../../hook/use-form';
import { MainLayout } from '../../layout/main-layout';
import { Image } from '../../types/image.type';

type Props = {
    path: string;
    returnPath: string;
    method: string;
    title: string;
    image?: Image;
};

type Ref = {
    file: File | undefined;
};

type QueryResult = {
    uploadUrl: {
        url: string;
    };
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3),
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        field: {
            marginBottom: theme.spacing(3),
        },
        buttonGroup: {
            marginLeft: 'auto',
        },
        button: {
            marginLeft: theme.spacing(3),
        },
    }),
);

const SIGNED_URL_QUERY = gql`
    mutation GetSignedUrl($fileName: String!, $contentType: String!) {
        uploadUrl(fileName: $fileName, contentType: $contentType) {
            url
        }
    }
`;

export function ImageForm(props: Props): JSX.Element {
    const classes = useStyles();
    const router = useRouter();
    const [fileName, setFileName] = useState('');
    const [contentType, setContentType] = useState('');
    const [message, setMessage] = useState(undefined);
    const { registerField, handleSubmit, errors, setErrors } = useForm();

    async function upload(file: File): Promise<void> {
        const client = initializeApollo();
        const { data: result } = await client.mutate<QueryResult>({
            mutation: SIGNED_URL_QUERY,
            variables: {
                fileName,
                contentType,
            },
        });

        await fetch(result!.uploadUrl.url, {
            method: 'PUT',
            headers: {
                'Content-type': file.type,
            },
            body: file,
        });
    }

    async function onSubmit(data: FormData): Promise<void> {
        if (!props.image) {
            await upload(data.get('image') as File);

            data.delete('image');
        }

        data.append('entity', JSON.stringify(hydrate(data)));

        const result = await fetch(props.path, {
            method: props.method,
            body: data,
        });
        const json = await result.json();

        if (json.success === true) {
            await router.push(props.returnPath);
        } else if (json.error) {
            setErrors(json.error);
            setMessage(undefined);
        } else {
            setMessage(json.msg ?? 'Er is iets fout gegaan');
        }
    }

    function onChange(event: FormEvent) {
        const files = (event.target as HTMLInputElement).files;

        if (files?.[0]) {
            // fileRef.current.file = files[0];
            setFileName(`${uuid()}-${files[0].name}`);
            setContentType(files[0].type);
        }
    }

    function renderMessage(): JSX.Element | null {
        if (message === undefined) {
            return null;
        }

        return <Alert severity="error">{message}</Alert>;
    }

    return (
        <MainLayout title={props.title}>
            <Card className={classes.root}>
                <CardContent>
                    <form
                        noValidate
                        autoComplete="off"
                        className={classes.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {renderMessage()}

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

                        {props.image && <img src="" alt="" />}

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

                        <div className={classes.buttonGroup}>
                            <Button
                                className={classes.button}
                                variant="contained"
                                type="button"
                                startIcon={<CancelIcon />}
                                onClick={() => router.push(props.returnPath)}
                            >
                                Annuleren
                            </Button>

                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                type="submit"
                                startIcon={<SaveIcon />}
                            >
                                Opslaan
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </MainLayout>
    );
}
