import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';

import { Locale } from '../../context/locale/Locale';
import { useDishes } from '../../hook/useDishes';
import { useLocale } from '../../hook/useLocale';
import { startOfWeek } from '../../service/date/startOfWeek';
import { weekDays } from '../../service/date/weekDays';
import { Dish } from '../../service/recipes/Dish';

type TempDish = Omit<Dish, 'id'>;

export function Planner(): JSX.Element {
    const fromDate: Date = startOfWeek(new Date());
    const days: Date[] = weekDays(fromDate);
    const toDate: Date = days[days.length - 1];
    const dishes: Dish[] = useDishes(fromDate, toDate);
    const locale: Locale = useLocale();
    const [edit, setEdit] = React.useState<Dish | TempDish | undefined>(
        undefined,
    );

    function getDish(day: Date): Dish | TempDish {
        const dish: Dish | undefined = dishes.find((dish: Dish) => {
            return dish.date.getTime() === day.getTime();
        });

        if (dish === undefined) {
            return {
                chef: '',
                date: new Date(day),
                title: '',
            };
        }

        return dish;
    }

    function handleEdit(dish: Dish | TempDish): void {
        setEdit(dish);
    }

    function handleClose(): void {
        setEdit(undefined);
    }

    function handleSave(dish: Dish | TempDish): void {}

    return (
        <>
            <List>
                {days.map(
                    (day: Date): JSX.Element => {
                        const dish = getDish(day);
                        const date = new Date(dish.date).toLocaleDateString(
                            locale.locale,
                            {
                                weekday: 'short',
                            },
                        );

                        return (
                            <ListItem key={dish.date.getTime()}>
                                <ListItemAvatar>
                                    <Avatar>{date.toUpperCase()}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={dish.title}
                                    secondary={dish.chef}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="edit"
                                        onClick={() => handleEdit(dish)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    },
                )}
            </List>
            <Dialog open={edit !== undefined} onClose={handleClose}>
                <DialogTitle>Edit dish</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Je kan hier het gericht voor de dag{' '}
                        {edit?.date.toLocaleDateString()} aanpassen
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="chef"
                        label="Chef"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
