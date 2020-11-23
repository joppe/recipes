import Alert from '@material-ui/lab/Alert';
import { GetServerSideProps } from 'next';
import React from 'react';

import EntityForm from '../../component/form/entity-form';
import { RecipeForm } from '../../component/form/recipe-form';
import { BASE_URL } from '../../config/api';
import { Ingredient } from '../../types/ingredient.type';
import { Recipe } from '../../types/recipe.type';
import { Unit } from '../../types/unit.type';

type SuccessResult = {
    success: true;
    recipe: Recipe;
};

type FailResult = {
    success: false;
    msg: string;
};

type Props = {
    result: SuccessResult | FailResult;
    units: Unit[];
    ingredients: Ingredient[];
};

export default function UpdateRecipe(props: Props): JSX.Element {
    if (!props.result.success) {
        return <Alert severity="error">{props.result.msg}</Alert>;
    }

    return (
        <EntityForm
            path={`${BASE_URL}/api/recipes/update`}
            returnPath="/recipes"
            method="PUT"
            title="Recept bewerken"
        >
            <RecipeForm
                recipe={props.result.recipe}
                ingredients={props.ingredients}
                units={props.units}
            />
        </EntityForm>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookie = ctx.req.headers.cookie;
    const [
        recipeResponse,
        ingredientsResponse,
        unitsResponse,
    ] = await Promise.all([
        fetch(`${BASE_URL}/api/recipes/${ctx.params?.id}`, {
            headers: {
                cookie: cookie as string,
            },
        }),
        fetch(`${BASE_URL}/api/ingredients`, {
            headers: {
                cookie: cookie as string,
            },
        }),
        fetch(`${BASE_URL}/api/units`, {
            headers: {
                cookie: cookie as string,
            },
        }),
    ]);

    return {
        props: {
            result: await recipeResponse.json(),
            ingredients: await ingredientsResponse.json(),
            units: await unitsResponse.json(),
        },
    };
};
