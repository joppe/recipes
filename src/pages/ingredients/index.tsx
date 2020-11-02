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

import { ConfirmDelete } from '../../component/confirm-delete';
import { MainLayout } from '../../layout/main-layout';
import { Ingredient } from '../../types/ingredient.type';

type Props = { ingredients: Ingredient[] };

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
        table: {},
    }),
);

export default function Ingredients(props: Props): JSX.Element {
    const [ingredients, setIngredients] = useState(props.ingredients);
    const [deleteTarget, setDeleteTarget] = useState<Ingredient | undefined>();
    const [message, setMessage] = useState(undefined);
    const router = useRouter();
    const classes = useStyles();

    async function handleConfirmDelete(): Promise<void> {
        const result = await fetch('/api/ingredients/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: deleteTarget?._id }),
        });
        const json = await result.json();

        if (json.success) {
            const response = await fetch(
                'http://localhost:3000/api/ingredients',
            );
            const json = await response.json();

            setIngredients(json);
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
        <MainLayout title="Lijst van ingredi&euml;nten">
            <div className={classes.root}>
                <ConfirmDelete
                    value={deleteTarget?.name ?? ''}
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
                    onClick={() => router.push('/ingredients/create')}
                >
                    Voeg ingredi&euml;nt toe
                </Button>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Naam</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {ingredients.map((ingredient) => (
                                <TableRow key={ingredient._id}>
                                    <TableCell component="th" scope="row">
                                        {ingredient.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            onClick={() =>
                                                router.push(
                                                    `/ingredients/${ingredient._id}`,
                                                )
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() =>
                                                setDeleteTarget(ingredient)
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

Ingredients.getInitialProps = async (): Promise<{
    ingredients: Ingredient[];
}> => {
    const response = await fetch('http://localhost:3000/api/ingredients');
    const json = await response.json();

    return { ingredients: json };
};
