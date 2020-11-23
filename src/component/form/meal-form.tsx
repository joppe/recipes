import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { formatISO, parseISO } from 'date-fns';
import React, { useContext, useState } from 'react';

import { FormContext, FormContextValue } from '../../context/form-context';
import { Meal } from '../../types/meal.type';
import { Recipe } from '../../types/recipe.type';
import { useStyles } from './style';

type Props = {
    meal?: Meal;
    recipes: Recipe[];
};

export function MealForm(props: Props): JSX.Element {
    const classes = useStyles();
    const [recipe, setRecipe] = useState<Recipe | undefined>(
        props.meal?.recipe,
    );
    const { registerField, errors } = useContext(
        FormContext,
    ) as FormContextValue;

    return (
        <>
            {props.meal?._id && (
                <input
                    type="hidden"
                    name="_id"
                    value={props.meal._id}
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
                className={classes.field}
                margin="dense"
                name="date"
                label="Datum"
                defaultValue={
                    props.meal?.date
                        ? formatISO(parseISO(props.meal.date), {
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
                className={classes.field}
                autoFocus
                margin="dense"
                name="chef"
                label="Chef"
                defaultValue={props.meal?.chef}
                type="text"
                error={errors['chef'] !== undefined}
                fullWidth
                inputRef={registerField()}
            />

            <TextField
                className={classes.field}
                margin="dense"
                name="name"
                label="Naam"
                defaultValue={recipe ? recipe.name : props.meal?.name}
                type="text"
                error={errors['name'] !== undefined}
                fullWidth
                required
                disabled={recipe !== undefined}
                inputRef={registerField()}
            />

            <Autocomplete
                className={classes.field}
                options={props.recipes}
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
                defaultValue={props.meal?.recipe}
                onChange={(event, newValue: Recipe | null) => {
                    setRecipe(newValue ? newValue : undefined);
                }}
            />
        </>
    );
}
