import { mergeTypeDefs } from 'graphql-tools';

import { typeDefs as imagesDefs } from './images/schema';
import { typeDefs as ingredientsDefs } from './ingredients/schema';
import { typeDefs as signedUrlDefs } from './signed-url/schema';

export const typeDefs = mergeTypeDefs([
    imagesDefs,
    ingredientsDefs,
    signedUrlDefs,
]);
