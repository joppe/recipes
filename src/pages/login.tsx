import { Button, Card, CardContent, TextField } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import { BASE_URL } from '../config/api';
import { UserContext } from '../context/user-provider';
import { useForm } from '../hook/use-form';
import { MainLayout } from '../layout/main-layout';

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

export default function Login(): JSX.Element {
    const classes = useStyles();
    const router = useRouter();
    const { registerField, handleSubmit, errors, setErrors } = useForm();
    const { setUser } = useContext(UserContext);

    async function onSubmit(data: FormData): Promise<void> {
        const body = {
            email: data.get('email'),
            password: data.get('password'),
        };
        const result = await fetch(`${BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const json = await result.json();

        if (json.success === true) {
            setUser(json.user);

            await router.push('/');
        } else {
            setErrors({
                email: 'invalid',
                password: 'invalid',
            });
        }
    }

    return (
        <MainLayout title={'Login'}>
            <Card className={classes.root}>
                <CardContent>
                    <form
                        noValidate
                        autoComplete="off"
                        className={classes.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextField
                            className={classes.textField}
                            autoFocus
                            margin="dense"
                            id="email"
                            name="email"
                            label="E-mail"
                            type="text"
                            error={errors['email'] !== undefined}
                            fullWidth
                            required={true}
                            inputRef={registerField()}
                        />
                        <TextField
                            className={classes.textField}
                            margin="dense"
                            id="password"
                            name="password"
                            label="Wachtwoord"
                            type="password"
                            error={errors['password'] !== undefined}
                            fullWidth
                            required={true}
                            inputRef={registerField()}
                        />
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            type="submit"
                            startIcon={<LockOpenIcon />}
                        >
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </MainLayout>
    );
}
