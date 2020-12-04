import { gql, useMutation } from '@apollo/client';
import React, { FormEvent, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';

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
    const input = useRef<HTMLInputElement>(null);
    const [getSignedUrl, { data }] = useMutation<QueryResult>(SIGNED_URL_QUERY);

    useEffect(() => {
        if (data === undefined || input.current === null) {
            return;
        }

        async function upload() {
            const file = input.current?.files?.[0] as File;
            const result = await fetch(data!.uploadUrl.url, {
                method: 'PUT',
                headers: {
                    'Content-type': file.type,
                },
                body: file,
            });

            console.log(result);
        }

        upload();
    }, [data]);

    function onChange(event: FormEvent) {
        const files = (event.target as HTMLInputElement).files;

        if (files?.[0]) {
            getSignedUrl({
                variables: {
                    fileName: `${uuid()}-${files[0].name}`,
                    contentType: files[0].type,
                },
            });
        }
    }

    return <input ref={input} type="file" onChange={onChange} />;
}
