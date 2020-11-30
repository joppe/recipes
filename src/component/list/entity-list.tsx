import { Button, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { BASE_URL } from '../../config/api';
import { MainLayout } from '../../layout/main-layout';
import { ConfirmDelete } from '../confirm-delete';

type Entity = {
    _id?: string;
};

type Mapper<T> = {
    name: string;
    convert(entity: T): string;
};

type Props<T> = {
    title: string;
    name: string;
    path: string;
    entities: T[];
    mappers: Mapper<T>[];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
        },
        button: {
            marginLeft: 'auto',
            marginBottom: theme.spacing(3),
        },
    }),
);

export default function EntityList<T extends Entity>(
    props: Props<T>,
): JSX.Element {
    const [entities, setEntities] = useState(props.entities);
    const [deleteTarget, setDeleteTarget] = useState<T | undefined>();
    const [message, setMessage] = useState(undefined);
    const router = useRouter();
    const classes = useStyles();

    async function handleConfirmDelete(): Promise<void> {
        const result = await fetch(`${BASE_URL}/api/${props.path}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: deleteTarget?._id }),
        });
        const json = await result.json();

        if (json.success) {
            const response = await fetch(`${BASE_URL}/api/${props.path}`);
            const json = await response.json();

            setEntities(json);
        } else {
            setMessage(json.msg ?? 'Er is iets fout gegaan');
        }

        setDeleteTarget(undefined);
    }

    function handleCancelDelete(): void {
        setDeleteTarget(undefined);
    }

    function renderMessage(): JSX.Element | null {
        if (message === undefined) {
            return null;
        }

        return <Alert severity="error">{message}</Alert>;
    }

    return (
        <MainLayout title={props.title}>
            <div className={classes.root}>
                <ConfirmDelete
                    value={
                        deleteTarget !== undefined
                            ? props.mappers[0].convert(deleteTarget)
                            : ''
                    }
                    open={deleteTarget !== undefined}
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />

                {renderMessage()}

                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => router.push(`/${props.path}/create`)}
                >
                    {`Voeg ${props.name} toe`}
                </Button>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {props.mappers.map((mapper) => {
                                    return (
                                        <TableCell key={mapper.name}>
                                            {mapper.name}
                                        </TableCell>
                                    );
                                })}
                                <TableCell />
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {entities.map((entity) => (
                                <TableRow key={entity._id}>
                                    {props.mappers.map((mapper) => {
                                        return (
                                            <TableCell
                                                key={mapper.name}
                                                component="th"
                                                scope="row"
                                            >
                                                {mapper.convert(entity)}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell align="right">
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            onClick={() =>
                                                router.push(
                                                    `/${props.path}/${entity._id}`,
                                                )
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() =>
                                                setDeleteTarget(entity)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </MainLayout>
    );
}
