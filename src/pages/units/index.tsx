import { GetServerSideProps } from 'next';
import React from 'react';

import EntityList from '../../component/list/entity-list';
import { protocol } from '../../config/api';
import { Unit } from '../../types/unit.type';

type Props = { units: Unit[] };

export default function Units(props: Props): JSX.Element {
    return (
        <EntityList<Unit>
            title="Lijst van eenheden"
            name="eenheden"
            path="units"
            entities={props.units}
            mappers={[
                {
                    name: 'Naam',
                    convert: (unit: Unit) => {
                        return unit.name;
                    },
                },
            ]}
        />
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const baseUrl = `${protocol}://${ctx.req.headers.host}`;
    const response = await fetch(`${baseUrl}/api/units`);
    const result = await response.json();
    const units = result.success ? result.units : [];

    return { props: { units } };
};
