import * as React from 'react';
import { css, Global } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';

export function Layout({ children }: { children: JSX.Element[] }): JSX.Element {
    return (
        <>
            <Global
                styles={css`
                    ${emotionNormalize.styles}
                `}
            />
            { children }
        </>
    );
}
