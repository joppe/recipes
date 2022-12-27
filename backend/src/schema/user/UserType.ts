import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'An user that can login and modify the data.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The record id of the user.',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the user.',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The email address of the user.',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The password of the user.',
    },
  }),
});
