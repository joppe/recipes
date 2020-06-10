import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';

import { Locale } from '../../contexts/locale/Locale';
import { useDishes } from '../../hooks/useDishes';
import { useLocale } from '../../hooks/useLocale';
import { endOfWeek } from '../../services/date/endOfWeek';
import { startOfWeek } from '../../services/date/startOfWeek';
import { Dish } from '../../services/recipes/Dish';

export function Planner(): JSX.Element {
    const fromDate: Date = startOfWeek(new Date());
    const toDate: Date = endOfWeek(fromDate);
    const dishes: Dish[] = useDishes(fromDate, toDate);
    const locale: Locale = useLocale();

    return (
        <List>
            {dishes.map(
                (dish: Dish): JSX.Element => {
                    const day = new Date(
                        dish.date,
                    ).toLocaleDateString(locale.locale, { weekday: 'short' });

                    return (
                        <ListItem key={dish.id}>
                            <ListItemAvatar>
                                <Avatar>{day.toUpperCase()}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={dish.title}
                                secondary={dish.chef}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <EditIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                },
            )}
        </List>
    );
}
