import { GraphQLList, GraphQLObjectType } from 'graphql';

import { ErrorResultType } from '../error/ErrorResultType';
import { UserType } from './UserType';

export const UserResultType: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserResult',
  description: 'The result of a user mutation',
  fields: () => ({
    user: {
      type: UserType,
      description: 'The user where the mutation was applied on.',
    },
    errors: {
      type: new GraphQLList(ErrorResultType),
      description: 'The error messages.',
    },
  }),
});
