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
import { useRouter } from 'next/router';

import { MainLayout } from '../../layout/main-layout';
import { Unit } from '../../types/unit.type';

type Props = { units: Unit[] };

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

export default function Units(props: Props): JSX.Element {
    const { units } = props;
    const router = useRouter();
    const classes = useStyles();

    return (
        <MainLayout title={'Lijst van eenheden'}>
            <div className={classes.root}>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => router.push('/units/create')}
                >
                    Voeg eenheid toe
                </Button>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Naam</TableCell>
                                <TableCell align="right">Afkorting</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {units.map((unit) => (
                                <TableRow key={unit._id}>
                                    <TableCell component="th" scope="row">
                                        {unit.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {unit.abbreviation}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            onClick={() => console.log('test')}
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => console.log('test')}
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

Units.getInitialProps = async (): Promise<{ units: Unit[] }> => {
    const response = await fetch('http://localhost:3000/api/units');
    const json = await response.json();

    return { units: json };
};
