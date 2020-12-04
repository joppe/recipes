import { gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import React from 'react';

import { initializeApollo } from '../../apollo/apollo-client';
import EntityList from '../../component/list/entity-list';
import { Image } from '../../types/image.type';

type Props = { images: Image[] };

export default function Ingredients(props: Props): JSX.Element {
    return (
        <EntityList<Image>
            title="Lijst van afbeeldingen"
            name="afbeelding"
            path="images"
            entities={props.images}
            mappers={[
                {
                    name: 'Naam',
                    convert: (image: Image) => {
                        return image.name;
                    },
                },
            ]}
        />
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const client = initializeApollo();
    const query = gql`
        query {
            images {
                _id
                name
            }
        }
    `;
    const result = await client.query({
        query,
    });

    return { props: { images: result.data.images } };
};
