import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const ErrorResultType: GraphQLObjectType = new GraphQLObjectType({
  name: 'ErrorResult',
  description: 'The error(s) that occured when invoking a mutation.',
  fields: () => ({
    message: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The error message.',
    },
  }),
});
