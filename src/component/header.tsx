import { Button } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import { UserContext } from '../context/user-provider';
import { LoggedInUser, isLoggedInUser } from '../types/user.type';

type Props = {
    title: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flexGrow: 1,
        },
    }),
);

export function Header(props: Props): JSX.Element {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const classes = useStyles();

    function loginButton(): JSX.Element {
        return (
            <Button color="inherit" onClick={() => router.push('/login')}>
                Login
            </Button>
        );
    }

    function userInfo(loggedInUser: LoggedInUser): JSX.Element {
        return (
            <Typography variant="subtitle1" noWrap>
                {loggedInUser.name}
            </Typography>
        );
    }

    return (
        <>
            <Typography variant="h6" noWrap className={classes.title}>
                {props.title}
            </Typography>
            {isLoggedInUser(user) ? userInfo(user) : loginButton()}
        </>
    );
}
