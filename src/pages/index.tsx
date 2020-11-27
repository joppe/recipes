import { GetServerSideProps } from 'next';
import React from 'react';

import { BASE_URL } from '../config/api';

type Props = {
    url: string;
};

const DAY_RANGE = 7;

export default function Planner(props: Props): JSX.Element {
    return (
        <div>
            <pre>{JSON.stringify(props, null, 4)}</pre>
            <div>{BASE_URL}</div>
            <div>{process.env.NEXT_PUBLIC_API_URL}</div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            url: `${BASE_URL}/api/meals/?range=${DAY_RANGE}`,
        },
    };
};
