import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FaceIcon from '@material-ui/icons/Face';
import FunctionsIcon from '@material-ui/icons/Functions';
import ListIcon from '@material-ui/icons/List';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import { UserContext } from '../context/user-provider';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
    }),
);

export function Nav(): JSX.Element {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const classes = useStyles();

    function userMenu(): JSX.Element | null {
        if (user.role === 'anonymous') {
            return null;
        }

        return (
            <>
                <Divider />
                <List>
                    <ListItem
                        button
                        selected={router.pathname.indexOf('/recipes') === 0}
                        key="recepten"
                        onClick={() => router.push('/recipes/')}
                    >
                        <ListItemIcon>
                            <RestaurantMenuIcon />
                        </ListItemIcon>
                        <ListItemText primary="Recepten" />
                    </ListItem>
                    <ListItem
                        button
                        selected={router.pathname.indexOf('/ingredients') === 0}
                        key="ingredienten"
                        onClick={() => router.push('/ingredients/')}
                    >
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ingredi&euml;nten" />
                    </ListItem>
                    <ListItem
                        button
                        selected={router.pathname.indexOf('/units') === 0}
                        key="eenheden"
                        onClick={() => router.push('/units/')}
                    >
                        <ListItemIcon>
                            <FunctionsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Eenheden" />
                    </ListItem>
                </List>
            </>
        );
    }

    function adminMenu(): JSX.Element | null {
        if (user.role !== 'admin') {
            return null;
        }

        return (
            <>
                <Divider />
                <List>
                    <ListItem
                        button
                        selected={router.pathname.indexOf('/users') === 0}
                        key="gebruikers"
                        onClick={() => router.push('/users/')}
                    >
                        <ListItemIcon>
                            <FaceIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gebruikers" />
                    </ListItem>
                </List>
            </>
        );
    }
    return (
        <>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem
                    button
                    selected={'/' === router.pathname}
                    key="weekplanner"
                    onClick={() => router.push('/')}
                >
                    <ListItemIcon>
                        <DateRangeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Planner" />
                </ListItem>
            </List>
            {userMenu()}
            {adminMenu()}
        </>
    );
}
