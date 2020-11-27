import { formatISO, parseISO, startOfWeek } from 'date-fns';
import { GetServerSideProps } from 'next';
import React from 'react';

import { BASE_URL } from '../config/api';
import { Meal } from '../types/meal.type';

type Props = {
    start: string;
    meals: Meal[];
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
    const cookie = ctx.req.headers.cookie;
    const date = ctx.query.from
        ? parseISO(ctx.query.from as string)
        : new Date();
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const from = formatISO(start, {
        representation: 'date',
    });
    const response = await fetch(
        `${BASE_URL}/api/meals/?from=${from}&range=${DAY_RANGE}`,
        {
            headers: {
                cookie: cookie as string,
            },
        },
    );
    const result = await response.json();

    return {
        props: {
            meals: result,
            start: from,
        },
    };
};
