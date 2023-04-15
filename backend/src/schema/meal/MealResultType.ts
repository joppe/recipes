import { GraphQLList, GraphQLObjectType } from 'graphql';

import { ErrorResultType } from '../error/ErrorResultType';

import { MealType } from './MealType';

export const MealResultType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MealResult',
  description: 'The result of a meal mutation',
  fields: () => ({
    meal: {
      type: MealType,
      description: 'The meal where the mutation was applied on.',
    },
    errors: {
      type: new GraphQLList(ErrorResultType),
      description: 'The error messages.',
    },
  }),
});
