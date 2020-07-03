import { AppBar, Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';

import { useSession } from '../../hook/useSession';

type TopProps = {
    className: string;
};

export function Top(props: TopProps): JSX.Element {
    const user = useSession() as firebase.User;

    return (
        <AppBar position="static" className={props.className}>
            <Toolbar>
                <Typography variant="h6">Hello {user.displayName}</Typography>
            </Toolbar>
        </AppBar>
    );
}