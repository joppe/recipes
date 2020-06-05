import { AppBar, Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';

import { UserContext } from '../../context/UserContext';

type TopProps = {
    className: string;
};

export function Top(props: TopProps): JSX.Element {
    const user: firebase.User = React.useContext(UserContext) as firebase.User;

    return (
        <AppBar position="static" className={props.className}>
            <Toolbar>
                <Typography variant="h6">Hello {user.displayName}</Typography>
            </Toolbar>
        </AppBar>
    );
}
