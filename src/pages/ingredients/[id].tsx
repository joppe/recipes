import Alert from '@material-ui/lab/Alert';
import { GetServerSideProps } from 'next';
import React from 'react';

import EntityForm from '../../component/form/entity-form';
import { IngredientForm } from '../../component/form/ingredient-form';
import { protocol } from '../../config/api';
import { Ingredient } from '../../types/ingredient.type';

type SuccessResult = {
    success: true;
    ingredient: Ingredient;
};

type FailResult = {
    success: false;
    msg: string;
};

type Props = {
    result: SuccessResult | FailResult;
};

export default function UpdateIngredient(props: Props): JSX.Element {
    if (!props.result.success) {
        return <Alert severity="error">{props.result.msg}</Alert>;
    }

    return (
        <EntityForm
            path={'/api/ingredients/update'}
            returnPath="/ingredients"
            method="PUT"
            title="Ingredi&euml;nt bewerken"
        >
            <IngredientForm ingredient={props.result.ingredient} />
        </EntityForm>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookie = ctx.req.headers.cookie;
    const baseUrl = `${protocol}://${ctx.req.headers.host}`;
    const response = await fetch(
        `${baseUrl}/api/ingredients/${ctx.params?.id}`,
        {
            headers: {
                cookie: cookie as string,
            },
        },
    );
    const result = await response.json();

    return { props: { result } };
};
