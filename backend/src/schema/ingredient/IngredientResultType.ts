import { GraphQLList, GraphQLObjectType } from 'graphql';

import { ErrorResultType } from '../error/ErrorResultType';
import { IngredientType } from './IngredientType';

export const IngredientResultType: GraphQLObjectType = new GraphQLObjectType({
  name: 'IngredientResult',
  description: 'The result of a ingredient mutation',
  fields: () => ({
    ingredient: {
      type: IngredientType,
      description: 'The ingredient where the mutation was applied on.',
    },
    errors: {
      type: new GraphQLList(ErrorResultType),
      description: 'The error messages.',
    },
  }),
});
