import { GetServerSideProps } from 'next';
import React from 'react';

import EntityList from '../../component/list/entity-list';
import { protocol } from '../../config/api';
import { Recipe } from '../../types/recipe.type';

type Props = { recipes: Recipe[] };

export default function Recipes(props: Props): JSX.Element {
    return (
        <EntityList<Recipe>
            title="Lijst van recepten"
            name="recepten"
            path="recipes"
            entities={props.recipes}
            mappers={[
                {
                    name: 'Naam',
                    convert: (recipe: Recipe) => {
                        return recipe.name;
                    },
                },
            ]}
        />
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookie = ctx.req.headers.cookie;
    const baseUrl = `${protocol}://${ctx.req.headers.host}`;
    const response = await fetch(`${baseUrl}/api/recipes`, {
        headers: {
            cookie: cookie as string,
        },
    });
    const result = await response.json();
    const recipes = result.success ? result.recipes : [];

    return { props: { recipes } };
};
