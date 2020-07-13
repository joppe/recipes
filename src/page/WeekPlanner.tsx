import { Card, CardContent, Container, IconButton } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as React from 'react';

import { Planner } from '../component/planner/Planner';
import { useLocale } from '../hook/useLocale';
import { fromTimestamp } from '../service/date/fromTimestamp';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dateNav: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
    }),
);

export function WeekPlanner(): JSX.Element {
    const classes = useStyles();
    const week = 7 * 24 * 60 * 60 * 1000;
    const locale = useLocale();
    const [timestamp, setTimestamp] = React.useState(Date.now());
    const date = fromTimestamp(timestamp).toLocaleDateString(locale.locale, {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    function previousWeek(): void {
        setTimestamp(timestamp - week);
    }

    function nextWeek(): void {
        setTimestamp(timestamp + week);
    }

    return (
        <Container>
            <div className={classes.dateNav}>
                <IconButton
                    edge="end"
                    aria-label="Previous week"
                    onClick={() => previousWeek()}
                >
                    <ChevronLeftIcon />
                </IconButton>

                <span>{date}</span>

                <IconButton
                    edge="end"
                    aria-label="Next week"
                    onClick={() => nextWeek()}
                >
                    <ChevronRightIcon />
                </IconButton>
            </div>
            <Card>
                <CardContent>
                    <Planner timestamp={timestamp} />
                </CardContent>
            </Card>
        </Container>
    );
}
