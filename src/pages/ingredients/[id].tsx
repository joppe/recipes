import { Button, Card, CardContent, TextField } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { InputFile } from '../../component/input-file';
import { hydrate } from '../../data/hydrate';
import { useForm } from '../../hook/use-form';
import { MainLayout } from '../../layout/main-layout';
import { Ingredient } from '../../types/ingredient.type';

type SuccessResult = {
    success: true;
    ingredient: Ingredient;
};

type FailResult = {
    success: false;
    msg: string;
};

type Props = {
    result: SuccessResult | FailResult;
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
        textField: {
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

export default function UpdateIngredient(props: Props): JSX.Element {
    const classes = useStyles();
    const router = useRouter();
    const [message, setMessage] = useState(
        props.result.success ? undefined : props.result.msg,
    );
    const { registerField, handleSubmit, errors, setErrors } = useForm();

    async function onSubmit(data: FormData): Promise<void> {
        data.append('entity', JSON.stringify(hydrate(data)));

        const result = await fetch('/api/ingredients/update', {
            method: 'PUT',
            body: data,
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

    function renderForm(): JSX.Element | null {
        if (!props.result.success) {
            return null;
        }

        return (
            <form
                noValidate
                autoComplete="off"
                className={classes.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    type="hidden"
                    name="_id"
                    value={props.result.ingredient._id}
                    ref={registerField()}
                />

                <TextField
                    className={classes.textField}
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Naam"
                    defaultValue={props.result.ingredient.name}
                    type="text"
                    error={errors['name'] !== undefined}
                    fullWidth
                    required
                    inputRef={registerField()}
                />

                <InputFile
                    name="image"
                    label="Afbeelding"
                    value={props.result.ingredient.image}
                    isImage={true}
                    className={classes.textField}
                    error={errors['image']}
                    registerField={registerField}
                />

                <div className={classes.buttonGroup}>
                    <Button
                        className={classes.button}
                        variant="contained"
                        type="button"
                        startIcon={<CancelIcon />}
                        onClick={() => router.push('/ingredients/')}
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
        );
    }

    return (
        <MainLayout title={'Ingredient bewerken'}>
            <Card className={classes.root}>
                <CardContent>
                    {renderMessage()}
                    {renderForm()}
                </CardContent>
            </Card>
        </MainLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookie = ctx.req.headers.cookie;
    const response = await fetch(
        `http://localhost:3000/api/ingredients/${ctx.params?.id}`,
        {
            headers: {
                cookie: cookie as string,
            },
        },
    );
    const result = await response.json();

    return { props: { result } };
};
