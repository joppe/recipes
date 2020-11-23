import React from 'react';

import EntityForm from '../../component/form/entity-form';
import { RecipeForm } from '../../component/form/recipe-form';
import { BASE_URL } from '../../config/api';
import { Ingredient } from '../../types/ingredient.type';
import { Unit } from '../../types/unit.type';

type Props = {
    units: Unit[];
    ingredients: Ingredient[];
};

export default function CreateRecipe(props: Props): JSX.Element {
    return (
        <EntityForm
            path={`${BASE_URL}/api/recipes/create`}
            returnPath="/recipes"
            method="POST"
            title="Recept aanmaken"
        >
            <RecipeForm ingredients={props.ingredients} units={props.units} />
        </EntityForm>
    );
}

CreateRecipe.getInitialProps = async (): Promise<{
    ingredients: Ingredient[];
    units: Unit[];
}> => {
    const [ingredientsResponse, unitsResponse] = await Promise.all([
        fetch(`${BASE_URL}/api/ingredients`),
        fetch(`${BASE_URL}/api/units`),
    ]);

    return {
        ingredients: await ingredientsResponse.json(),
        units: await unitsResponse.json(),
    };
};
