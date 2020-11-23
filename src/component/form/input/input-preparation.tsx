import { Divider, TextField, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';

import { RegisterReference } from '../../../hook/use-form';

type Props = {
    steps?: string[];
    className: string;
    registerField(): RegisterReference;
};

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

export function InputPreparation(props: Props): JSX.Element {
    const classes = useStyles();
    const [steps, setSteps] = useState(
        props.steps === undefined ? [''] : props.steps,
    );

    function addStep() {
        setSteps([...steps, '']);
    }

    function removeStep(index: number) {
        setSteps([...steps.slice(0, index), ...steps.slice(index + 1)]);
    }

    return (
        <div className={classes.root}>
            <Divider />
            <Typography className={classes.header}>
                Bereiding stappen
            </Typography>

            {steps.map((step, index) => {
                return (
                    <div key={step}>
                        <div className={classes.subHeader}>
                            <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                            >{`Stap ${index + 1}`}</Typography>
                            <IconButton
                                aria-label="verwijder"
                                onClick={(): void => removeStep(index)}
                                className={classes.remove}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                        <TextField
                            className={props.className}
                            margin="dense"
                            name={`preparation[${index}]`}
                            defaultValue={step}
                            rows={6}
                            fullWidth
                            multiline
                            inputRef={props.registerField()}
                        />
                    </div>
                );
            })}

            <div className={classes.footer}>
                <Typography>Voeg een stap toe</Typography>
                <IconButton aria-label="voeg stap toe" onClick={addStep}>
                    <AddIcon />
                </IconButton>
            </div>
        </div>
    );
}
