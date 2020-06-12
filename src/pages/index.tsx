import { Card, CardContent, Container } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

import { Planner } from '../components/planner/Planner';
import { Top } from '../components/top/Top';
import { EnsureLoggedInContainer } from '../containers/EnsureLoggedInContainer';
import { Locale } from '../contexts/locale/Locale';
import { LocaleContext } from '../contexts/locale/LocaleContext';
import { FirebaseProvider } from '../providers/FirebaseProvider';

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
        <FirebaseProvider>
            <LocaleContext.Provider value={locale}>
                <EnsureLoggedInContainer>
                    <Top className={classes.top} />
                    <Container>
                        <Card>
                            <CardContent>
                                <Planner />
                            </CardContent>
                        </Card>
                    </Container>
                </EnsureLoggedInContainer>
            </LocaleContext.Provider>
        </FirebaseProvider>
    );
}
