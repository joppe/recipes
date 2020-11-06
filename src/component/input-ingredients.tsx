import { Divider, TextField, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';

import { RegisterReference } from '../hook/use-form';
import { Recipe } from '../types/recipe.type';

type Props = {
    ingredients?: string[];
    className: string;
    registerField(): RegisterReference;
};

type Row = Recipe['ingredients'][0];

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
    }),
);

export function InputIngredients(props: Props): JSX.Element {
    const classes = useStyles();
    const [rows, setRows] = useState([]);

    function addRow() {
        // setRows([...row, '']);
    }
    //
    // function removeStep(index: number) {
    //     setRows([...row.slice(0, index), ...row.slice(index + 1)]);
    // }

    return (
        <div className={classes.root}>
            <Divider />
            <Typography className={classes.header}>
                Ingredi&euml;nten
            </Typography>

            {rows.map((step, index) => {
                return <div key={step}></div>;
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
