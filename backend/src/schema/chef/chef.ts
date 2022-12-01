import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index';

export const chef = new GraphQLObjectType({
  name: 'Chef',
  description: 'A person that can cook meals',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The record id of the chef.',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the chef.',
    },
    skill: {
      type: new GraphQLNonNull(GraphQLInt),
      description:
        'The skill tells how talented a chef is on a scale from 0 to 5.',
    },
  }),
});
