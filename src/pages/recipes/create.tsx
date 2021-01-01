import { GetServerSideProps } from 'next';
import React from 'react';

import EntityForm from '../../component/form/entity-form';
import { RecipeForm } from '../../component/form/recipe-form';
import { protocol } from '../../config/api';
import { Ingredient } from '../../types/ingredient.type';
import { Unit } from '../../types/unit.type';

type Props = {
    units: Unit[];
    ingredients: Ingredient[];
};

export default function CreateRecipe(props: Props): JSX.Element {
    return (
        <EntityForm
            path={'/api/recipes/create'}
            returnPath="/recipes"
            method="POST"
            title="Recept aanmaken"
        >
            <RecipeForm ingredients={props.ingredients} units={props.units} />
        </EntityForm>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const baseUrl = `${protocol}://${ctx.req.headers.host}`;
    const [ingredientsResponse, unitsResponse] = await Promise.all([
        fetch(`${baseUrl}/api/ingredients`),
        fetch(`${baseUrl}/api/units`),
    ]);

    return {
        props: {
            ingredients: await ingredientsResponse.json(),
            units: await unitsResponse.json(),
        },
    };
};
