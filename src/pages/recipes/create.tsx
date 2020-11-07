import { Button, Card, CardContent, TextField } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { InputCheckbox } from '../../component/input-checkbox';
import { InputFile } from '../../component/input-file';
import { InputIngredients } from '../../component/input-ingredients';
import { InputPreparation } from '../../component/input-preparation';
import { InputSlider } from '../../component/input-slider';
import { BASE_URL } from '../../config/api';
import { hydrate } from '../../data/hydrate';
import { useForm } from '../../hook/use-form';
import { MainLayout } from '../../layout/main-layout';
import { Ingredient } from '../../types/ingredient.type';
import { Unit } from '../../types/unit.type';

type Props = {
    units: Unit[];
    ingredients: Ingredient[];
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
        sliderField: {
            marginTop: theme.spacing(3),
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

export default function CreateRecipe(props: Props): JSX.Element {
    const classes = useStyles();
    const router = useRouter();
    const [message, setMessage] = useState(undefined);
    const { registerField, handleSubmit, errors, setErrors } = useForm();

    async function onSubmit(data: FormData): Promise<void> {
        data.append('entity', JSON.stringify(hydrate(data)));

        const result = await fetch(`${BASE_URL}/api/recipes/create`, {
            method: 'POST',
            body: data,
        });
        const json = await result.json();

        if (json.success === true) {
            await router.push('/recipes');
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
        <MainLayout title={'Recept aanmaken'}>
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
                            name="name"
                            label="Naam"
                            type="text"
                            error={errors['name'] !== undefined}
                            fullWidth
                            required
                            inputRef={registerField()}
                        />

                        <TextField
                            className={classes.textField}
                            margin="dense"
                            name="description"
                            label="Omschrijving"
                            rows={6}
                            fullWidth
                            multiline
                            inputRef={registerField()}
                        />

                        <TextField
                            className={classes.textField}
                            margin="dense"
                            name="source"
                            label="Bron"
                            type="text"
                            fullWidth
                            inputRef={registerField()}
                        />

                        <InputFile
                            name="image"
                            label="Afbeelding"
                            value={undefined}
                            isImage={true}
                            className={classes.textField}
                            error={errors['image']}
                            registerField={registerField}
                        />

                        <InputCheckbox
                            label="Vegetarisch"
                            name="vegetarian"
                            className={classes.textField}
                            value={undefined}
                            defaultValue={false}
                            registerField={registerField}
                        />

                        <InputCheckbox
                            label="Veganistisch"
                            name="vegan"
                            className={classes.textField}
                            value={undefined}
                            defaultValue={false}
                            registerField={registerField}
                        />

                        <InputSlider
                            min={1}
                            max={5}
                            step={1}
                            label="Moeilijkheidsgraad"
                            name="difficulty"
                            className={classes.sliderField}
                            defaultValue={3}
                            registerField={registerField}
                        />

                        <TextField
                            className={classes.textField}
                            margin="dense"
                            name="course"
                            label="Gerecht"
                            type="text"
                            fullWidth
                            inputRef={registerField()}
                        />

                        <InputSlider
                            min={1}
                            max={40}
                            step={1}
                            label="Aantal personen"
                            name="servings"
                            className={classes.sliderField}
                            defaultValue={4}
                            registerField={registerField}
                        />

                        <InputSlider
                            min={1}
                            max={240}
                            step={1}
                            label="Bereidingstijd"
                            name="preparation_time"
                            className={classes.sliderField}
                            defaultValue={30}
                            registerField={registerField}
                        />

                        <InputPreparation
                            className={classes.textField}
                            registerField={registerField}
                            steps={undefined}
                        />

                        <InputIngredients
                            data={{
                                ingredients: props.ingredients,
                                units: props.units,
                            }}
                            ingredients={undefined}
                            className={classes.textField}
                            registerField={registerField}
                        />

                        <div className={classes.buttonGroup}>
                            <Button
                                className={classes.button}
                                variant="contained"
                                type="button"
                                startIcon={<CancelIcon />}
                                onClick={() => router.push('/recipes/')}
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

CreateRecipe.getInitialProps = async (): Promise<{
    ingredients: Ingredient[];
    units: Unit[];
}> => {
    const [ingredientsResponse, unitsResponse] = await Promise.all([
        fetch(`${BASE_URL}/api/ingredients`),
        fetch(`${BASE_URL}/api/units`),
    ]);

    return {
        ingredients: await ingredientsResponse.json(),
        units: await unitsResponse.json(),
    };
};
