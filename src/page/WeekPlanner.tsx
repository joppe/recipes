import { Card, CardContent, Container } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

import { Planner } from '../component/planner/Planner';
import { Top } from '../component/top/Top';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        top: {
            marginBottom: theme.spacing(5),
        },
    }),
);

export function WeekPlanner(): JSX.Element {
    const classes = useStyles();

    return (
        <>
            <Top className={classes.top} />
            <Container>
                <Card>
                    <CardContent>
                        <Planner />
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
