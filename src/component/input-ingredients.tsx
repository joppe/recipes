import {
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';

import { RegisterReference } from '../hook/use-form';
import { Ingredient } from '../types/ingredient.type';
import { Recipe } from '../types/recipe.type';
import { Unit } from '../types/unit.type';

type Props = {
    ingredients?: Recipe['ingredients'];
    className: string;
    data: {
        ingredients: Ingredient[];
        units: Unit[];
    };
    registerField(): RegisterReference;
};

type Row = Recipe['ingredients'][0] & { id: number };

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: theme.spacing(3),
        },
        header: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        },
        subHeader: {
            display: 'flex',
            alignItems: 'center',
        },
        remove: {
            marginLeft: 'auto',
        },
        footer: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        row: {
            display: 'flex',
            alignItems: 'center',
        },
        preparation: {
            flexGrow: 1,
            margin: theme.spacing(1),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

let count = 0;

function getId() {
    return count++;
}

function emptyRow(): Row {
    return { amount: 0, name: '', preparation: '', unit: '', id: getId() };
}

export function InputIngredients(props: Props): JSX.Element {
    const classes = useStyles();
    const [rows, setRows] = useState(
        props.ingredients === undefined
            ? [emptyRow()]
            : props.ingredients.map((i) => {
                  return {
                      ...i,
                      id: getId(),
                  };
              }),
    );

    function addRow() {
        setRows([...rows, emptyRow()]);
    }

    function removeRow(index: number) {
        setRows([...rows.slice(0, index), ...rows.slice(index + 1)]);
    }

    return (
        <div className={classes.root}>
            <Divider />
            <Typography className={classes.header}>
                Ingredi&euml;nten
            </Typography>

            {rows.map((row, index) => {
                const registerName = props.registerField();
                const registerUnit = props.registerField();

                return (
                    <div key={index} className={classes.row}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="ingredient-select-label">
                                Ingredient
                            </InputLabel>
                            <Select
                                labelId="ingredient-select-label"
                                name={`ingredients[${index}].name`}
                                defaultValue={row.name}
                                inputRef={(ref) => {
                                    if (ref) {
                                        registerName(ref.node);
                                    } else {
                                        registerName(null);
                                    }
                                }}
                            >
                                {props.data.ingredients.map((i) => {
                                    return (
                                        <MenuItem key={i._id} value={i.name}>
                                            {i.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <TextField
                            className={classes.formControl}
                            margin="dense"
                            name={`ingredients[${index}].amount`}
                            label="Hoeveelheid"
                            type="number"
                            defaultValue={row.amount}
                            inputRef={props.registerField()}
                        />

                        <FormControl className={classes.formControl}>
                            <InputLabel id="unit-select-label">
                                Eenheid
                            </InputLabel>
                            <Select
                                labelId="unit-select-label"
                                name={`ingredients[${index}].unit`}
                                defaultValue={row.unit}
                                inputRef={(ref) => {
                                    if (ref) {
                                        registerUnit(ref.node);
                                    } else {
                                        registerUnit(null);
                                    }
                                }}
                            >
                                {props.data.units.map((i) => {
                                    return (
                                        <MenuItem key={i._id} value={i.name}>
                                            {i.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <TextField
                            className={classes.preparation}
                            margin="dense"
                            name={`ingredients[${index}].preparation`}
                            label="Bewerking"
                            type="text"
                            defaultValue={row.preparation}
                            inputRef={props.registerField()}
                        />

                        <IconButton
                            aria-label="verwijder"
                            onClick={(): void => removeRow(index)}
                            className={classes.remove}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                );
            })}

            <div className={classes.footer}>
                <Typography>Voeg een ingredient toe</Typography>
                <IconButton aria-label="voeg ingredient toe" onClick={addRow}>
                    <AddIcon />
                </IconButton>
            </div>
        </div>
    );
}
