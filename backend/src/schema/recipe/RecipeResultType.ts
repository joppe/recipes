import { GraphQLList, GraphQLObjectType } from 'graphql';

import { ErrorResultType } from '../error/ErrorResultType';

import { RecipeType } from './RecipeType';

export const RecipeResultType: GraphQLObjectType = new GraphQLObjectType({
  name: 'RecipeResult',
  description: 'The result of a recipe mutation',
  fields: () => ({
    recipe: {
      type: RecipeType,
      description: 'The recipe where the mutation was applied on.',
    },
    errors: {
      type: new GraphQLList(ErrorResultType),
      description: 'The error messages.',
    },
  }),
});
