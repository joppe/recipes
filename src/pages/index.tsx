import {
    Avatar,
    Card,
    CardContent,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

import { Top } from '../components/top/Top';
import { EnsureLoggedInContainer } from '../containers/EnsureLoggedInContainer';
import { Locale } from '../context/locale/Locale';
import { LocaleContext } from '../context/locale/LocaleContext';

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
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Container>
            </EnsureLoggedInContainer>
        </LocaleContext.Provider>
    );
}
