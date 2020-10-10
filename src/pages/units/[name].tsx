import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Unit } from '../../types/unit.type';

type Props = {
    unit: Unit | null;
};

export default function Detail(props: Props): JSX.Element {
    const router = useRouter();
    const [unit, setUnit] = useState(props.unit);

    useEffect(() => {
        async function getData() {
            const response = await fetch(
                `http://localhost:4001/units?name=${router.query.name}`,
            );
            const units = await response.json();

            setUnit(units[0] ?? null);
        }

        if (unit === null) {
            getData();
        }
    }, []);

    return (
        <div>
            <h1>unit {unit?.name}</h1>
        </div>
    );
}

interface UnitPageContext extends NextPageContext {
    query: {
        name: string;
    };
}

Detail.getInitialProps = async (
    ctx: UnitPageContext,
): Promise<{ unit: Unit | null }> => {
    if (!ctx.req) {
        return { unit: null };
    }

    const response = await fetch(
        `http://localhost:4001/units?name=${ctx.query.name}`,
    );
    const units = await response.json();

    return { unit: units[0] ?? null };
};
