import {
    BottomNavigation,
    BottomNavigationAction,
    Theme,
    createStyles,
    makeStyles,
} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import EventIcon from '@material-ui/icons/Event';
import * as React from 'react';

import { Recipes } from '../component/recipes/Recipes';
import { Top } from '../component/top/Top';
import { WeekPlanner } from '../page/WeekPlanner';

const PLANNER_SCREEN = 'planner';
const RECIPES_SCREEN = 'recepten';
const DEFAULT_SCREEN = PLANNER_SCREEN;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        },
        top: {
            marginBottom: theme.spacing(5),
        },
        bottom: {
            marginTop: 'auto',
        },
    }),
);

export function ContentContainer(): JSX.Element {
    const classes = useStyles();
    const [screen, setScreen] = React.useState(DEFAULT_SCREEN);

    function content(): JSX.Element | null {
        switch (screen) {
            case PLANNER_SCREEN:
                return <WeekPlanner />;
            case RECIPES_SCREEN:
                return <Recipes />;
            default:
                return null;
        }
    }

    function handleChange(
        event: React.ChangeEvent<any>,
        newValue: string,
    ): void {
        setScreen(newValue);
    }

    return (
        <div className={classes.container}>
            <Top className={classes.top} />

            {content()}

            <BottomNavigation
                showLabels
                value={screen}
                onChange={handleChange}
                className={classes.bottom}
            >
                <BottomNavigationAction
                    label="Planner"
                    value={PLANNER_SCREEN}
                    icon={<EventIcon />}
                />
                <BottomNavigationAction
                    label="Recipes"
                    value={RECIPES_SCREEN}
                    icon={<DescriptionIcon />}
                />
            </BottomNavigation>
        </div>
    );
}
