import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import * as React from 'react';

import { useFirebase } from '../../hook/useFirebase';
import { Dish } from '../../service/recipes/Dish';
import { TempDish } from '../../service/recipes/TempDish';

type EditDishProps = {
    dish: Dish | TempDish | undefined;
    onClose(): void;
};

export function EditDish(props: EditDishProps): JSX.Element {
    const firebase = useFirebase();
    const [dish, setDish] = React.useState(props.dish);

    React.useEffect((): void => {
        setDish(props.dish);
    }, [props.dish]);

    function handleSave(): void {
        if ((dish as Dish).id) {
            firebase
                .firestore()
                .collection('dishes')
                .doc((dish as Dish).id)
                .update({
                    title: dish?.title,
                    chef: dish?.chef,
                    date: dish?.date,
                });
        } else {
            firebase
                .firestore()
                .collection('dishes')
                .add({
                    title: dish?.title,
                    chef: dish?.chef,
                    date: dish?.date,
                    updatedAt: firebase.firestore.Timestamp.fromDate(
                        new Date(),
                    ),
                });
        }

        props.onClose();
    }

    return (
        <Dialog open={props.dish !== undefined} onClose={props.onClose}>
            <DialogTitle>Edit dish</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Je kan hier het gericht voor de dag{' '}
                    {dish?.date.toLocaleDateString()} aanpassen
                </DialogContentText>

                <form onSubmit={handleSave}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={dish?.title ?? ''}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ): void => {
                            setDish({
                                ...(dish as TempDish),
                                title: event.target.value,
                            });
                        }}
                    />

                    <TextField
                        margin="dense"
                        id="chef"
                        label="Chef"
                        type="text"
                        fullWidth
                        value={dish?.chef ?? ''}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ): void => {
                            setDish({
                                ...(dish as TempDish),
                                chef: event.target.value,
                            });
                        }}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
