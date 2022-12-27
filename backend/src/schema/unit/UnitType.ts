import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const UnitType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Unit',
  description:
    'An unit to apply to the amount of ingredient needed in a recipe.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The record id of the unit.',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the unit.',
    },
    abbreviation: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The abbreviation of the unit.',
    },
  }),
});
