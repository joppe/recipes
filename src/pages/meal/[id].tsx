import Alert from '@material-ui/lab/Alert';
import { GetServerSideProps } from 'next';
import React from 'react';

import EntityForm from '../../component/form/entity-form';
import { MealForm } from '../../component/form/meal-form';
import { protocol } from '../../config/api';
import { Meal } from '../../types/meal.type';
import { Recipe } from '../../types/recipe.type';

type SuccessResult = {
    success: true;
    meal: Meal;
    recipes: Recipe[];
};

type FailResult = {
    success: false;
    msg: string;
};

type Props = {
    result: SuccessResult | FailResult;
};

export default function UpdateMeal(props: Props): JSX.Element {
    const isUpdate = props.result.success && props.result.meal._id;
    const path = isUpdate ? 'update' : 'create';
    const method = isUpdate ? 'PUT' : 'POST';

    if (!props.result.success) {
        return <Alert severity="error">{props.result.msg}</Alert>;
    }

    return (
        <EntityForm
            path={`/api/meals/${path}`}
            returnPath="/"
            method={method}
            title="Maaltijd bewerken"
        >
            <MealForm meal={props.result.meal} recipes={props.result.recipes} />
        </EntityForm>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookie = ctx.req.headers.cookie;
    const baseUrl = `${protocol}://${ctx.req.headers.host}`;
    const recipesResponse = await fetch(`${baseUrl}/api/recipes`, {
        headers: {
            cookie: cookie as string,
        },
    });

    if (ctx.params?.id === 'new') {
        return {
            props: {
                result: {
                    success: true,
                    recipes: await recipesResponse.json(),
                    meal: {
                        date: ctx.query.date,
                        name: '',
                    },
                },
            },
        };
    }

    const response = await fetch(`${baseUrl}/api/meals/${ctx.params?.id}`, {
        headers: {
            cookie: cookie as string,
        },
    });
    const result = await response.json();

    return {
        props: {
            result: {
                ...result,
                recipes: await recipesResponse.json(),
            },
        },
    };
};
