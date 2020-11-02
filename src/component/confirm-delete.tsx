import { Button } from '@material-ui/core';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import React from 'react';

type Props = {
    value: string;
    open: boolean;
    onConfirm(): void;
    onCancel(): void;
};

export function ConfirmDelete(props: Props): JSX.Element {
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            keepMounted
            maxWidth="sm"
            aria-labelledby="Confirm delete"
            open={props.open}
        >
            <DialogTitle id="confirmation-dialog-title">
                Verwijderen
            </DialogTitle>
            <DialogContent dividers>
                <p>
                    Weet je zeker dat je <strong>{props.value}</strong> wilt
                    verwijderen?
                </p>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.onCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.onConfirm} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}
