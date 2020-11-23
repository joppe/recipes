import { TextField } from '@material-ui/core';
import React, { useContext } from 'react';

import { FormContext, FormContextValue } from '../../context/form-context';
import { Ingredient } from '../../types/ingredient.type';
import { Recipe } from '../../types/recipe.type';
import { Unit } from '../../types/unit.type';
import { InputCheckbox } from './input/input-checkbox';
import { InputFile } from './input/input-file';
import { InputIngredients } from './input/input-ingredients';
import { InputPreparation } from './input/input-preparation';
import { InputSlider } from './input/input-slider';
import { useStyles } from './style';

type Props = {
    recipe?: Recipe;
    ingredients: Ingredient[];
    units: Unit[];
};

export function RecipeForm(props: Props): JSX.Element {
    const classes = useStyles();
    const { registerField, errors } = useContext(
        FormContext,
    ) as FormContextValue;

    return (
        <>
            {props.recipe && (
                <input
                    type="hidden"
                    name="_id"
                    value={props.recipe._id}
                    ref={registerField()}
                />
            )}

            <TextField
                className={classes.field}
                autoFocus
                margin="dense"
                name="name"
                label="Naam"
                defaultValue={props.recipe ? props.recipe.name : ''}
                type="text"
                error={errors['name'] !== undefined}
                fullWidth
                required
                inputRef={registerField()}
            />

            <TextField
                className={classes.field}
                margin="dense"
                name="description"
                label="Omschrijving"
                defaultValue={props.recipe ? props.recipe.description : ''}
                rows={6}
                fullWidth
                multiline
                inputRef={registerField()}
            />

            <TextField
                className={classes.field}
                margin="dense"
                name="source"
                label="Bron"
                defaultValue={props.recipe ? props.recipe.source : ''}
                type="text"
                fullWidth
                inputRef={registerField()}
            />

            <InputFile
                name="image"
                label="Afbeelding"
                value={props.recipe?.image}
                isImage={true}
                className={classes.field}
                error={errors['image']}
                registerField={registerField}
            />

            <InputCheckbox
                label="Vegetarisch"
                name="vegetarian"
                className={classes.field}
                value={props.recipe?.vegetarian}
                defaultValue={false}
                registerField={registerField}
            />

            <InputCheckbox
                label="Veganistisch"
                name="vegan"
                className={classes.field}
                value={props.recipe?.vegan}
                defaultValue={false}
                registerField={registerField}
            />

            <InputSlider
                min={1}
                max={5}
                step={1}
                label="Moeilijkheidsgraad"
                name="difficulty"
                className={classes.slider}
                defaultValue={props.recipe?.difficulty as number}
                registerField={registerField}
            />

            <TextField
                className={classes.field}
                margin="dense"
                name="course"
                defaultValue={props.recipe?.course}
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
                className={classes.slider}
                defaultValue={props.recipe?.servings as number}
                registerField={registerField}
            />

            <InputSlider
                min={1}
                max={240}
                step={1}
                label="Bereidingstijd"
                name="preparation_time"
                className={classes.slider}
                defaultValue={props.recipe?.preparation_time as number}
                registerField={registerField}
            />

            <InputPreparation
                className={classes.field}
                registerField={registerField}
                steps={props.recipe?.preparation}
            />

            <InputIngredients
                data={{
                    ingredients: props.ingredients,
                    units: props.units,
                }}
                ingredients={props.recipe?.ingredients}
                className={classes.field}
                registerField={registerField}
            />
        </>
    );
}
