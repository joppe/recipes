import Link from 'next/link';

import { Unit } from '../../types/unit.type';

type Props = { units: Unit[] };

export default function Units({ units }: Props): JSX.Element {
    return (
        <div>
            <h1>Eenheden</h1>

            <ul>
                {units.map(
                    (unit: Unit): JSX.Element => {
                        return (
                            <li key={unit.abbreviation}>
                                <Link
                                    as={`/units/${unit.name}`}
                                    href="/units/[name]"
                                >
                                    <a>{unit.name}</a>
                                </Link>
                            </li>
                        );
                    },
                )}
            </ul>
        </div>
    );
}

Units.getInitialProps = async (): Promise<{ units: Unit[] }> => {
    const response = await fetch('http://localhost:4001/units');
    const units = await response.json();

    return { units };
};
