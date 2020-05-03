import * as React from 'react';
import { css, Global, SerializedStyles } from '@emotion/core';
// tslint:disable-next-line match-default-export-name
import emotionNormalize from 'emotion-normalize';

import { root } from '../styles/root';
import { LocaleProvider } from '../containers/LocaleProvider';

const containerStyles: SerializedStyles = css({
    display: 'flex',
    justifyContent: 'center',
});

const contentStyles: SerializedStyles = css({
    maxWidth: '1024px',
    width: '1024px',
});

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
            <LocaleProvider>
                <div css={containerStyles}>
                    <div css={contentStyles}>{children}</div>
                </div>
            </LocaleProvider>
        </>
    );
}
