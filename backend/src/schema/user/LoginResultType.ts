import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { ErrorResultType } from '../error/ErrorResultType';

export const LoginResultType: GraphQLObjectType = new GraphQLObjectType({
  name: 'LoginResult',
  description: 'The result of a user login',
  fields: () => ({
    token: {
      type: GraphQLString,
      description: 'The authorization token.',
    },
    errors: {
      type: new GraphQLList(ErrorResultType),
      description: 'The error messages.',
    },
  }),
});
