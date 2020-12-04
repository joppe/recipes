import { TextField } from '@material-ui/core';
import React, { useContext } from 'react';

import { FormContext, FormContextValue } from '../../context/form-context';
import { Ingredient } from '../../types/ingredient.type';
import { InputFileDeprecated } from './input/input-file-deprecated';
import { useStyles } from './style';

type Props = {
    ingredient?: Ingredient;
};

export function IngredientForm(props: Props): JSX.Element {
    const classes = useStyles();
    const { registerField, errors } = useContext(
        FormContext,
    ) as FormContextValue;

    return (
        <>
            {props.ingredient && (
                <input
                    type="hidden"
                    name="_id"
                    value={props.ingredient._id}
                    ref={registerField()}
                />
            )}

            <TextField
                className={classes.field}
                autoFocus
                margin="dense"
                name="name"
                label="Naam"
                defaultValue={props.ingredient ? props.ingredient.name : ''}
                type="text"
                error={errors['name'] !== undefined}
                fullWidth
                required
                inputRef={registerField()}
            />

            <InputFileDeprecated
                name="image"
                label="Afbeelding"
                value={props.ingredient ? props.ingredient.image : undefined}
                isImage={true}
                className={classes.field}
                error={errors['image']}
                registerField={registerField}
            />

            <TextField
                className={classes.field}
                margin="dense"
                name="description"
                label="Omschrijving"
                defaultValue={
                    props.ingredient ? props.ingredient.description : ''
                }
                error={errors['description'] !== undefined}
                rows={6}
                fullWidth
                multiline
                inputRef={registerField()}
            />
        </>
    );
}
