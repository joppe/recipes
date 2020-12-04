import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

import { useApollo } from '../apollo/apollo-client';
import { theme } from '../config/theme';
import { UserProvider } from '../context/user-provider';

export default function App(props: AppProps): JSX.Element {
    const { Component, pageProps } = props;
    const apolloClient = useApollo(pageProps.initialApolloState);

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');

        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>My page</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ApolloProvider client={apolloClient}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <UserProvider>
                        <Component {...pageProps} />
                    </UserProvider>
                </ThemeProvider>
            </ApolloProvider>
        </React.Fragment>
    );
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
