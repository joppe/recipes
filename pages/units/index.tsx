import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';

import { Unit } from '../../types/unit.type';

type Props = { units: Unit[] };

export default function Units(props: Props): JSX.Element {
    const [units, setUnits] = useState(props.units);

    useEffect(() => {
        async function getData() {
            const response = await fetch('http://localhost:3000/api/units');
            const units = await response.json();

            setUnits(units ?? []);
        }

        if (units.length === 0) {
            getData();
        }
    }, []);

    return (
        <div>
            <h1>Eenheden</h1>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Naam</TableCell>
                            <TableCell align="right">Afkorting</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {units.map((unit) => (
                            <TableRow key={unit._id}>
                                <TableCell component="th" scope="row">
                                    {unit._id}
                                </TableCell>
                                <TableCell align="right">{unit.name}</TableCell>
                                <TableCell align="right">
                                    {unit.abbreviation}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

Units.getInitialProps = async (): Promise<{ units: Unit[] }> => {
    const response = await fetch('http://localhost:3000/api/units');
    const json = await response.json();

    return { units: json.units };
};
