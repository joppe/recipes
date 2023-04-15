import { GraphQLList, GraphQLObjectType } from 'graphql';

import { ErrorResultType } from '../error/ErrorResultType';

import { ChefType } from './ChefType';

export const ChefResultType: GraphQLObjectType = new GraphQLObjectType({
  name: 'ChefResult',
  description: 'The result of a chef mutation',
  fields: () => ({
    chef: {
      type: ChefType,
      description: 'The chef where the mutation was applied on.',
    },
    errors: {
      type: new GraphQLList(ErrorResultType),
      description: 'The error messages.',
    },
  }),
});
