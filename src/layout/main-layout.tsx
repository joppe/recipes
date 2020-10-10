import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
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
import React from 'react';

import { Header } from '../component/Header';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    }),
);

type Props = {
    title: string;
    children: React.ReactNode;
};

export function MainLayout(props: Props): JSX.Element {
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header className={classes.appBar} title={props.title} />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem
                        button
                        selected={'/' === router.pathname}
                        key={'weekplanner'}
                        onClick={() => router.push('/')}
                    >
                        <ListItemIcon>
                            <DateRangeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Planner'} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem
                        button
                        selected={router.pathname.indexOf('/recipes') === 0}
                        key={'recepten'}
                        onClick={() => router.push('/recipes/')}
                    >
                        <ListItemIcon>
                            <RestaurantMenuIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Recepten'} />
                    </ListItem>
                    <ListItem
                        button
                        selected={router.pathname.indexOf('/ingredients') === 0}
                        key={'ingredienten'}
                        onClick={() => router.push('/ingredients/')}
                    >
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Ingredienten'} />
                    </ListItem>
                    <ListItem
                        button
                        selected={router.pathname.indexOf('/units') === 0}
                        key={'eenheden'}
                        onClick={() => router.push('/units/')}
                    >
                        <ListItemIcon>
                            <FunctionsIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Eenheden'} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem
                        button
                        selected={router.pathname.indexOf('/users') === 0}
                        key={'gebruikers'}
                        onClick={() => router.push('/users/')}
                    >
                        <ListItemIcon>
                            <FaceIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Gebruikers'} />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}
