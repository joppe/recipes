import { mergeTypeDefs } from 'graphql-tools';

import { typeDefs as ingredientsDefs } from './ingredients/schema';
import { typeDefs as signedUrlDefs } from './signed-url/schema';

export const typeDefs = mergeTypeDefs([ingredientsDefs, signedUrlDefs]);
