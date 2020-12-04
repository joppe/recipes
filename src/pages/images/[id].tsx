import Alert from '@material-ui/lab/Alert';
import { GetServerSideProps } from 'next';
import React from 'react';

import { ImageForm } from '../../component/form/image-form';
import { BASE_URL } from '../../config/api';
import { Image } from '../../types/image.type';

type SuccessResult = {
    success: true;
    image: Image;
};

type FailResult = {
    success: false;
    msg: string;
};

type Props = {
    result: SuccessResult | FailResult;
};

export default function UpdateImage(props: Props): JSX.Element {
    if (!props.result.success) {
        return <Alert severity="error">{props.result.msg}</Alert>;
    }

    return (
        <ImageForm
            path={`${BASE_URL}/api/images/update`}
            returnPath="/images"
            method="POST"
            title="Afbeelding bewerken"
            image={props.result.image}
        />
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookie = ctx.req.headers.cookie;
    const response = await fetch(`${BASE_URL}/api/images/${ctx.params?.id}`, {
        headers: {
            cookie: cookie as string,
        },
    });
    const result = await response.json();

    return { props: { result } };
};
