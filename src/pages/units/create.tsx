import React from 'react';

import EntityForm from '../../component/form/entity-form';
import { UnitForm } from '../../component/form/unit-form';
import { BASE_URL } from '../../config/api';

export default function CreateUnit(): JSX.Element {
    return (
        <EntityForm
            path={`${BASE_URL}/api/units/create`}
            returnPath="/units"
            method="POST"
            title="Eenheid aanmaken"
        >
            <UnitForm />
        </EntityForm>
    );
}
