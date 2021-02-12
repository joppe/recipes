import React from 'react';

import EntityForm from '../../component/form/entity-form';
import { IngredientForm } from '../../component/form/ingredient-form';

export default function CreateIngredient(): JSX.Element {
    return (
        <EntityForm
            path={'/api/ingredients/create'}
            returnPath="/ingredients"
            method="POST"
            title="Ingredi&euml;nt aanmaken"
        >
            <IngredientForm />
        </EntityForm>
    );
}
