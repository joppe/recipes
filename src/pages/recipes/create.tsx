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
    const cookie = ctx.req.headers.cookie;
    const baseUrl = `${protocol}://${ctx.req.headers.host}`;
    const [ingredientsResponse, unitsResponse] = await Promise.all([
        fetch(`${baseUrl}/api/ingredients`, {
            headers: {
                cookie: cookie as string,
            },
        }),
        fetch(`${baseUrl}/api/units`, {
            headers: {
                cookie: cookie as string,
            },
        }),
    ]);
    const ingredientsResult = await ingredientsResponse.json();
    const ingredients = ingredientsResult.success
        ? ingredientsResult.ingredients
        : [];
    const unitsResult = await unitsResponse.json();
    const units = unitsResult.success ? unitsResult.units : [];

    return {
        props: {
            ingredients,
            units,
        },
    };
};
