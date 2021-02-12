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
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { ConfirmDelete } from '../../component/confirm-delete';
import { protocol } from '../../config/api';
import { MainLayout } from '../../layout/main-layout';
import { Recipe } from '../../types/recipe.type';

type Props = { recipes: Recipe[] };

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
export default function Recipes(props: Props): JSX.Element {
    const [recipes, setRecipes] = useState(props.recipes);
    const [deleteTarget, setDeleteTarget] = useState<Recipe | undefined>();
    const [message, setMessage] = useState(undefined);
    const router = useRouter();
    const classes = useStyles();

    async function handleConfirmDelete(): Promise<void> {
        const result = await fetch('/api/recipes/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: deleteTarget?._id }),
        });
        const json = await result.json();

        if (json.success) {
            const response = await fetch('/api/recipes');
            const json = await response.json();

            setRecipes(json);
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
        <MainLayout title="Lijst van recepten">
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
                    onClick={() => router.push('/recipes/create')}
                >
                    Voeg recept toe
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
                            {recipes.map((recipe) => (
                                <TableRow key={recipe._id}>
                                    <TableCell component="th" scope="row">
                                        {recipe.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            onClick={() =>
                                                router.push(
                                                    `/recipes/${recipe._id}`,
                                                )
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() =>
                                                setDeleteTarget(recipe)
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookie = ctx.req.headers.cookie;
    const baseUrl = `${protocol}://${ctx.req.headers.host}`;
    const response = await fetch(`${baseUrl}/api/recipes`, {
        headers: {
            cookie: cookie as string,
        },
    });
    const result = await response.json();
    const recipes = result.success ? result.recipes : [];

    return { props: { recipes } };
};
