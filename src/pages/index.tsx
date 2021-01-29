import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
    addDays,
    eachDayOfInterval,
    format,
    formatISO,
    parseISO,
    startOfWeek,
} from 'date-fns';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { protocol } from '../config/api';
import { MainLayout } from '../layout/main-layout';
import { Meal } from '../types/meal.type';

type Props = {
    start: string;
    meals: Meal[];
};

const useStyles = makeStyles(() =>
    createStyles({
        header: {
            display: 'flex',
            alignItems: 'center',
        },
        date: {
            margin: '0 20px',
        },
    }),
);

const DAY_RANGE = 7;

export default function Planner(props: Props): JSX.Element {
    const router = useRouter();
    const start = parseISO(props.start);
    const end = addDays(start, DAY_RANGE - 1);
    const next = addDays(end, 1);
    const previous = addDays(start, -(DAY_RANGE - 1));
    const days = eachDayOfInterval({ start, end });
    const classes = useStyles();

    function getMeal(day: string): Meal | undefined {
        return props.meals.find((meal) => {
            return String(meal.date).indexOf(day) === 0;
        });
    }

    function getTitle(meal: Meal | undefined): string {
        if (meal === undefined) {
            return '';
        }

        return meal.recipe?.name ?? meal.name;
    }

    return (
        <MainLayout title={'Weekplanner'}>
            <div className={classes.header}>
                <IconButton
                    edge="start"
                    aria-label="edit"
                    onClick={() => {
                        router.push(
                            `/?from=${formatISO(previous, {
                                representation: 'date',
                            })}`,
                        );
                    }}
                >
                    <NavigateBeforeIcon />
                </IconButton>

                <Typography variant="subtitle1" noWrap>
                    {format(start, 'd MMMM')} - {format(end, 'd MMMM')}
                </Typography>

                <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                        router.push(
                            `/?from=${formatISO(next, {
                                representation: 'date',
                            })}`,
                        );
                    }}
                >
                    <NavigateNextIcon />
                </IconButton>
            </div>

            <List>
                {days.map((day) => {
                    const d = formatISO(day, {
                        representation: 'date',
                    });
                    const meal = getMeal(d);

                    return (
                        <ListItem key={day.getTime()}>
                            <ListItemAvatar>
                                <Avatar>
                                    {format(day, 'EEEEEE').toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={getTitle(meal)}
                                secondary={meal ? meal.chef : ''}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    onClick={() => {
                                        if (meal) {
                                            router.push(`/meal/${meal._id}`);
                                        } else {
                                            router.push(`/meal/new?date=${d}`);
                                        }
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </MainLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookie = ctx.req.headers.cookie;
    const date = ctx.query.from
        ? parseISO(ctx.query.from as string)
        : new Date();
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const from = formatISO(start, {
        representation: 'date',
    });
    const baseUrl = `${protocol}://${ctx.req.headers.host}`;
    const response = await fetch(
        `${baseUrl}/api/meals/?from=${from}&range=${DAY_RANGE}`,
        {
            headers: {
                cookie: cookie as string,
            },
        },
    );
    const result = await response.json();
    const meals = result.success ? result.meals : [];

    return {
        props: {
            meals,
            start: from,
        },
    };
};
