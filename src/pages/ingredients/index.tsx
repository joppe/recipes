import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import React from 'react';

import EntityList from '../../component/list/entity-list';
import { BASE_URL } from '../../config/api';
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
    const query = gql`
        query {
            ingredients {
                _id
                name
            }
        }
    `;
    const client = new ApolloClient({
        link: new HttpLink({
            uri: `${BASE_URL}/api/graphql`,
        }),
        cache: new InMemoryCache(),
    });
    const result = await client.query({
        query,
    });

    return { props: { ingredients: result.data.ingredients } };
};
