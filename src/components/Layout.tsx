import { Global, SerializedStyles, css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';
import * as React from 'react';

import { LocaleProvider } from '../containers/LocaleProvider';
import { root } from '../styles/root';

const containerStyles: SerializedStyles = css({
    display: 'flex',
    justifyContent: 'center',
});

const contentStyles: SerializedStyles = css({
    maxWidth: '1024px',
    width: '1024px',
});

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
            <LocaleProvider>
                <div css={containerStyles}>
                    <div css={contentStyles}>{children}</div>
                </div>
            </LocaleProvider>
        </>
    );
}
