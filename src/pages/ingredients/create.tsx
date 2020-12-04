import React from 'react';

import EntityForm from '../../component/form/entity-form';
import { IngredientForm } from '../../component/form/ingredient-form';
import { BASE_URL } from '../../config/api';

export default function CreateIngredient(): JSX.Element {
    return (
        <EntityForm
            path={`${BASE_URL}/api/ingredients/create`}
            returnPath="/ingredients"
            method="POST"
            title="Ingredi&euml;nt aanmaken"
        >
            <IngredientForm />
        </EntityForm>
    );
}
