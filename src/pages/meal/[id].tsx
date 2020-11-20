import { Button, Card, CardContent, TextField } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { Autocomplete } from '@material-ui/lab';
import Alert from '@material-ui/lab/Alert';
import { format, formatISO, parse, parseISO } from 'date-fns';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { BASE_URL } from '../../config/api';
import { hydrate } from '../../data/hydrate';
import { useForm } from '../../hook/use-form';
import { MainLayout } from '../../layout/main-layout';
import { Meal } from '../../types/meal.type';
import { Recipe } from '../../types/recipe.type';

type SuccessResult = {
    success: true;
    meal: Meal;
    recipes: Recipe[];
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

export default function UpdateMeal(props: Props): JSX.Element {
    const classes = useStyles();
    const [recipe, setRecipe] = useState<Recipe | undefined>(
        props.result.success ? props.result?.meal?.recipe : undefined,
    );
    const router = useRouter();
    const [message, setMessage] = useState(
        props.result.success ? undefined : props.result.msg,
    );
    const { registerField, handleSubmit, errors, setErrors } = useForm();

    async function onSubmit(data: FormData): Promise<void> {
        const isUpdate = props.result.success && props.result.meal._id;
        const path = isUpdate ? 'update' : 'create';
        const method = isUpdate ? 'PUT' : 'POST';

        data.append('entity', JSON.stringify(hydrate(data)));

        const result = await fetch(`${BASE_URL}/api/meals/${path}`, {
            method,
            body: data,
        });
        const json = await result.json();

        if (json.success === true) {
            await router.push('/');
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
                {props.result.meal._id && (
                    <input
                        type="hidden"
                        name="_id"
                        value={props.result.meal._id}
                        ref={registerField()}
                    />
                )}

                {recipe && (
                    <input
                        type="hidden"
                        name="recipe"
                        value={recipe._id}
                        ref={registerField()}
                    />
                )}

                <TextField
                    className={classes.textField}
                    margin="dense"
                    name="date"
                    label="Datum"
                    defaultValue={
                        props.result.meal.date
                            ? formatISO(parseISO(props.result.meal.date), {
                                  representation: 'date',
                              })
                            : undefined
                    }
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={errors['date'] !== undefined}
                    required
                    inputRef={registerField()}
                />

                <TextField
                    className={classes.textField}
                    autoFocus
                    margin="dense"
                    name="chef"
                    label="Chef"
                    defaultValue={props.result.meal.chef}
                    type="text"
                    error={errors['chef'] !== undefined}
                    fullWidth
                    inputRef={registerField()}
                />

                <TextField
                    className={classes.textField}
                    margin="dense"
                    name="name"
                    label="Naam"
                    defaultValue={recipe ? recipe.name : props.result.meal.name}
                    type="text"
                    error={errors['name'] !== undefined}
                    fullWidth
                    required
                    disabled={recipe !== undefined}
                    inputRef={registerField()}
                />

                <Autocomplete
                    className={classes.textField}
                    options={props.result.recipes}
                    getOptionLabel={(option: Recipe) => option.name}
                    getOptionSelected={(option: Recipe) =>
                        option._id === recipe?._id
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Recept"
                            margin="normal"
                            variant="outlined"
                        />
                    )}
                    defaultValue={props.result?.meal?.recipe}
                    onChange={(event, newValue: Recipe | null) => {
                        setRecipe(newValue ? newValue : undefined);
                    }}
                />

                <div className={classes.buttonGroup}>
                    <Button
                        className={classes.button}
                        variant="contained"
                        type="button"
                        startIcon={<CancelIcon />}
                        onClick={() => router.push('/')}
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
        <MainLayout title={'Gerecht bewerken'}>
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
    const recipesResponse = await fetch(`${BASE_URL}/api/recipes`, {
        headers: {
            cookie: cookie as string,
        },
    });

    if (ctx.params?.id === 'new') {
        return {
            props: {
                result: {
                    success: true,
                    recipes: await recipesResponse.json(),
                    meal: {
                        date: ctx.query.date,
                        name: '',
                    },
                },
            },
        };
    }

    const response = await fetch(`${BASE_URL}/api/meals/${ctx.params?.id}`, {
        headers: {
            cookie: cookie as string,
        },
    });
    const result = await response.json();

    return {
        props: {
            result: {
                ...result,
                recipes: await recipesResponse.json(),
            },
        },
    };
};
