import Alert from '@material-ui/lab/Alert';
import { GetServerSideProps } from 'next';
import React from 'react';

import EntityForm from '../../component/form/entity-form';
import { UnitForm } from '../../component/form/unit-form';
import { BASE_URL } from '../../config/api';
import { Unit } from '../../types/unit.type';

type SuccessResult = {
    success: true;
    unit: Unit;
};

type FailResult = {
    success: false;
    msg: string;
};

type Props = {
    result: SuccessResult | FailResult;
};

export default function UpdateUnit(props: Props): JSX.Element {
    if (!props.result.success) {
        return <Alert severity="error">{props.result.msg}</Alert>;
    }

    return (
        <EntityForm
            path={`${BASE_URL}/api/units/update`}
            returnPath="/units"
            method="PUT"
            title="Eenheid bewerken"
        >
            <UnitForm unit={props.result.unit} />
        </EntityForm>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookie = ctx.req.headers.cookie;
    const response = await fetch(`${BASE_URL}/api/units/${ctx.params?.id}`, {
        headers: {
            cookie: cookie as string,
        },
    });
    const result = await response.json();

    return { props: { result } };
};
