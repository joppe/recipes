import { TextField } from '@material-ui/core';
import React, { useContext } from 'react';

import { FormContext, FormContextValue } from '../../context/form-context';
import { Unit } from '../../types/unit.type';
import { useStyles } from './style';

type Props = {
    unit?: Unit;
};

export function UnitForm(props: Props): JSX.Element {
    const classes = useStyles();
    const { registerField, errors } = useContext(
        FormContext,
    ) as FormContextValue;

    return (
        <>
            {props.unit && (
                <input
                    type="hidden"
                    name="_id"
                    value={props.unit._id}
                    ref={registerField()}
                />
            )}

            <TextField
                className={classes.field}
                autoFocus
                margin="dense"
                name="name"
                label="Naam"
                type="text"
                defaultValue={props.unit ? props.unit.name : ''}
                error={errors['name'] !== undefined}
                fullWidth
                required
                inputRef={registerField()}
            />

            <TextField
                className={classes.field}
                margin="dense"
                name="abbreviation"
                label="Afkorting"
                type="text"
                defaultValue={props.unit ? props.unit.abbreviation : ''}
                error={errors['abbreviation'] !== undefined}
                fullWidth
                required
                inputRef={registerField()}
            />

            <TextField
                className={classes.field}
                margin="dense"
                name="description"
                label="Omschrijving"
                defaultValue={props.unit ? props.unit.description : ''}
                rows={6}
                fullWidth
                multiline
                inputRef={registerField()}
            />
        </>
    );
}
