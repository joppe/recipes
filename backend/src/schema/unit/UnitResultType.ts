import { GraphQLList, GraphQLObjectType } from 'graphql';

import { ErrorResultType } from '../error/ErrorResultType';

import { UnitType } from './UnitType';

export const UnitResultType: GraphQLObjectType = new GraphQLObjectType({
  name: 'UnitResult',
  description: 'The result of a unit mutation',
  fields: () => ({
    unit: {
      type: UnitType,
      description: 'The unit where the mutation was applied on.',
    },
    errors: {
      type: new GraphQLList(ErrorResultType),
      description: 'The error messages.',
    },
  }),
});
