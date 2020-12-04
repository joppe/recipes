import { mergeResolvers } from 'graphql-tools';

import { resolvers as ingredientsResolvers } from './ingredients/resolvers';
import { resolvers as signedUrlResolvers } from './signed-url/resolvers';

export const resolvers = mergeResolvers([
    ingredientsResolvers,
    signedUrlResolvers,
]);
