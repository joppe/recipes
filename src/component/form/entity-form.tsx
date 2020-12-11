import { Button, Card, CardContent } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { FormContext } from '../../context/form-context';
import { hydrate } from '../../data/hydrate';
import { useForm } from '../../hook/use-form';
import { MainLayout } from '../../layout/main-layout';

type Props = {
    path: string;
    returnPath: string;
    method: string;
    title: string;
    children: React.ReactNode;
    onPreSubmit?(data: FormData): Promise<void>;
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
        buttonGroup: {
            marginLeft: 'auto',
        },
        button: {
            marginLeft: theme.spacing(3),
        },
    }),
);

export default function EntityForm(props: Props): JSX.Element {
    const classes = useStyles();
    const router = useRouter();
    const [message, setMessage] = useState(undefined);
    const { registerField, handleSubmit, errors, setErrors } = useForm();

    async function onSubmit(data: FormData): Promise<void> {
        if (props.onPreSubmit) {
            await props.onPreSubmit(data);
        }

        data.append('entity', JSON.stringify(hydrate(data)));

        const result = await fetch(props.path, {
            method: props.method,
            body: data,
        });
        const json = await result.json();

        if (json.success === true) {
            await router.push(props.returnPath);
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
        <MainLayout title={props.title}>
            <Card className={classes.root}>
                <CardContent>
                    <form
                        noValidate
                        autoComplete="off"
                        className={classes.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {renderMessage()}

                        <FormContext.Provider value={{ errors, registerField }}>
                            {props.children}
                        </FormContext.Provider>

                        <div className={classes.buttonGroup}>
                            <Button
                                className={classes.button}
                                variant="contained"
                                type="button"
                                startIcon={<CancelIcon />}
                                onClick={() => router.push(props.returnPath)}
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
