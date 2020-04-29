import * as React from 'react';
import { css, Global } from '@emotion/core';
// tslint:disable-next-line match-default-export-name
import emotionNormalize from 'emotion-normalize';

import { root } from '../styles/root';

// tslint:disable-next-line function-name
export function Layout({
    children,
}: {
    children: JSX.Element[] | JSX.Element;
}): JSX.Element {
    return (
        <>
            <Global
                styles={css`
                    ${emotionNormalize.styles}
                    ${root}
                `}
            />
            {children}
        </>
    );
}
