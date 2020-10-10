import { Button, Card, CardContent, TextField } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import React, { useState } from 'react';

import { MainLayout } from '../../layout/main-layout';
import { Unit } from '../../types/unit.type';

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
        button: {
            marginLeft: 'auto',
        },
    }),
);

export default function CreateUnit(): JSX.Element {
    const classes = useStyles();
    // https://blog.logrocket.com/forms-in-react-in-2020/
    // const [unit, setUnit] = useState<Partial<Unit>>({});

    // function save(): void {}

    return (
        <MainLayout title={'Eenheid aanmaken'}>
            <Card className={classes.root}>
                <CardContent>
                    <form
                        noValidate
                        autoComplete="off"
                        className={classes.form}
                    >
                        <TextField
                            className={classes.textField}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Naam"
                            type="text"
                            fullWidth
                        />

                        <TextField
                            className={classes.textField}
                            margin="dense"
                            id="abbreviation"
                            label="Afkorting"
                            type="text"
                            fullWidth
                        />

                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                        >
                            Opslaan
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </MainLayout>
    );
}
