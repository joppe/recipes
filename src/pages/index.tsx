import {
    Avatar,
    Card,
    CardContent,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';

import { Top } from '../components/top/Top';
import { EnsureLoggedInContainer } from '../containers/EnsureLoggedInContainer';
import { Locale } from '../contexts/locale/Locale';
import { LocaleContext } from '../contexts/locale/LocaleContext';
import { firebase } from '../services/firebase/firebase';

const locale: Locale = {
    locale: 'nl-NL',
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        top: {
            marginBottom: theme.spacing(5),
        },
    }),
);
export default function (): JSX.Element {
    const classes = useStyles();

    React.useEffect(() => {
        return firebase
            .firestore()
            .collection('dishes')
            .onSnapshot((a) => {
                console.log(a);
            });
    });

    return (
        <LocaleContext.Provider value={locale}>
            <EnsureLoggedInContainer>
                <Top className={classes.top} />
                <Container>
                    <Card>
                        <CardContent>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>MA</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Nasi Goreng" />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Container>
            </EnsureLoggedInContainer>
        </LocaleContext.Provider>
    );
}
