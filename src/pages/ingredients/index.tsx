import { GetServerSideProps } from 'next';
import React from 'react';

import EntityList from '../../component/list/entity-list';
import { protocol } from '../../config/api';
import { Ingredient } from '../../types/ingredient.type';

type Props = { ingredients: Ingredient[] };

export default function Ingredients(props: Props): JSX.Element {
    return (
        <EntityList<Ingredient>
            title="Lijst van ingredi&euml;nten"
            name="ingredi&euml;nt"
            path="ingredients"
            entities={props.ingredients}
            mappers={[
                {
                    name: 'Naam',
                    convert: (ingredient: Ingredient) => {
                        return ingredient.name;
                    },
                },
            ]}
        />
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookie = ctx.req.headers.cookie;
    const baseUrl = `${protocol}://${ctx.req.headers.host}`;
    const response = await fetch(`${baseUrl}/api/ingredients`, {
        headers: {
            cookie: cookie as string,
        },
    });
    const result = await response.json();
    const ingredients = result.success ? result.ingredients : [];

    return { props: { ingredients } };
};
