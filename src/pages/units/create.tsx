import React from 'react';

import EntityForm from '../../component/form/entity-form';
import { UnitForm } from '../../component/form/unit-form';

export default function CreateUnit(): JSX.Element {
    return (
        <EntityForm
            path={'/api/units/create'}
            returnPath="/units"
            method="POST"
            title="Eenheid aanmaken"
        >
            <UnitForm />
        </EntityForm>
    );
}
