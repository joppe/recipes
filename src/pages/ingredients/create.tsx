import { Button, Card, CardContent, TextField } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useForm } from '../../hook/use-form';
import { MainLayout } from '../../layout/main-layout';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3),
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        textField: {
            marginBottom: theme.spacing(3),
        },
        button: {
            marginLeft: 'auto',
        },
    }),
);

export default function CreateUnit(): JSX.Element {
    const classes = useStyles();
    const router = useRouter();
    const [message, setMessage] = useState(undefined);
    const { registerField, handleSubmit, errors, setErrors } = useForm();

    async function onSubmit(data: FormData): Promise<void> {
        const body = {
            name: data.get('name'),
        };
        const result = await fetch('/api/ingredients/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const json = await result.json();

        if (json.success === true) {
            await router.push('/ingredients');
        } else if (json.error) {
            setErrors(json.error);
            setMessage(undefined);
        } else {
            setMessage(json.msg ?? 'Er is iets fout gegaan');
        }
    }

    function renderMessage(): JSX.Element | null {
        if (message === undefined) {
            return null;
        }

        return <Alert severity="error">{message}</Alert>;
    }

    return (
        <MainLayout title={'Ingredient aanmaken'}>
            <Card className={classes.root}>
                <CardContent>
                    <form
                        noValidate
                        autoComplete="off"
                        className={classes.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {renderMessage()}

                        <TextField
                            className={classes.textField}
                            autoFocus
                            margin="dense"
                            id="name"
                            name="name"
                            label="Naam"
                            type="text"
                            error={errors['name'] !== undefined}
                            fullWidth
                            required={true}
                            inputRef={registerField()}
                        />

                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            type="submit"
                            startIcon={<SaveIcon />}
                        >
                            Opslaan
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </MainLayout>
    );
}
