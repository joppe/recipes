import React from 'react';

import { BASE_URL } from '../config/api';

export default function Planner(): JSX.Element {
    return (
        <div>
            <div>{BASE_URL}</div>
            <div>{process.env.NEXT_PUBLIC_API_URL}</div>
        </div>
    );
}
