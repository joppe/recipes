import { css, SerializedStyles } from "@emotion/core";

export const root: SerializedStyles = css`
    @font-face {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 300;
        src: local(''),
            url('/fonts/oswald/oswald-v31-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('/fonts/oswald/oswald-v31-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
    @font-face {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 400;
        src: local(''),
            url('/fonts/oswald/oswald-v31-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('/fonts/oswald/oswald-v31-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
    @font-face {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 500;
        src: local(''),
            url('/fonts/oswald/oswald-v31-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('/fonts/oswald/oswald-v31-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
    @font-face {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        src: local(''),
            url('/fonts/oswald/oswald-v31-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('/fonts/oswald/oswald-v31-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }

    html {
        font-family: 'Oswald'
    }
`;
