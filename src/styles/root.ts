import { css, SerializedStyles } from '@emotion/core';

import { spacing } from './spacing';

export const root: SerializedStyles = css`
    /* roboto-300 - latin */
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 300;
        src: local('Roboto Light'), local('Roboto-Light'),
            url('/fonts/roboto/roboto-v20-latin-300.woff2') format('woff2'),
            /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto/roboto-v20-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
    /* roboto-regular - latin */
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: local('Roboto'), local('Roboto-Regular'),
            url('/fonts/roboto/roboto-v20-latin-regular.woff2') format('woff2'),
            /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto/roboto-v20-latin-regular.woff')
                format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
    /* roboto-italic - latin */
    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 400;
        src: local('Roboto Italic'), local('Roboto-Italic'),
            url('/fonts/roboto/roboto-v20-latin-italic.woff2') format('woff2'),
            /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto/roboto-v20-latin-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
    /* roboto-700 - latin */
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        src: local('Roboto Bold'), local('Roboto-Bold'),
            url('/fonts/roboto/roboto-v20-latin-700.woff2') format('woff2'),
            /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto/roboto-v20-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }

    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    html {
        font-family: 'Roboto';
    }

    h1,
    h2,
    h3 {
        margin: 0;
        padding: 0;
    }

    input[type='text'] {
        padding: ${spacing[1]}px;
        width: 100%;
    }
`;
