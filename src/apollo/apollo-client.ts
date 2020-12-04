import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { NormalizedCacheObject } from '@apollo/client/cache';
import { useMemo } from 'react';

import { BASE_URL } from '../config/api';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({
            uri: `${BASE_URL}/api/graphql`,
        }),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(
    initialState: NormalizedCacheObject | null = null,
): ApolloClient<NormalizedCacheObject> {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Restore the cache using the data passed from getStaticProps/getServerSideProps
        // combined with the existing cached data
        _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') {
        return _apolloClient;
    }

    // Create the Apollo Client once in the client
    if (!apolloClient) {
        apolloClient = _apolloClient;
    }

    return _apolloClient;
}

export function useApollo(
    initialState: NormalizedCacheObject,
): ApolloClient<NormalizedCacheObject> {
    const store = useMemo(() => {
        return initializeApollo(initialState);
    }, [initialState]);

    return store;
}
