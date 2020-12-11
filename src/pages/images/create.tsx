import { gql } from '@apollo/client';
import React from 'react';

import { initializeApollo } from '../../apollo/apollo-client';
import EntityForm from '../../component/form/entity-form';
import { ImageForm } from '../../component/form/image-form';
import { BASE_URL } from '../../config/api';

type QueryResult = {
    uploadUrl: {
        url: string;
    };
};

const SIGNED_URL_QUERY = gql`
    mutation GetSignedUrl($fileName: String!, $contentType: String!) {
        uploadUrl(fileName: $fileName, contentType: $contentType) {
            url
        }
    }
`;
export default function CreateImage(): JSX.Element {
    async function onSubmit(data: FormData): Promise<void> {
        const contentType = data.get('contentType');
        const fileName = data.get('fileName');
        const file = data.get('image') as File;
        const client = initializeApollo();

        const { data: result } = await client.mutate<QueryResult>({
            mutation: SIGNED_URL_QUERY,
            variables: {
                fileName,
                contentType,
            },
        });

        await fetch(result!.uploadUrl.url, {
            method: 'PUT',
            headers: {
                'Content-type': file.type,
            },
            body: file,
        });

        data.delete('image');
    }

    return (
        <EntityForm
            path={`${BASE_URL}/api/images/create`}
            returnPath="/images"
            method="POST"
            title="Afbeelding aanmaken"
            onPreSubmit={onSubmit}
        >
            <ImageForm />
        </EntityForm>
    );
}
