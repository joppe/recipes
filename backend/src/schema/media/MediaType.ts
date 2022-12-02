import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index';

export const MediaType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Media',
  description: 'A video or image.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The record id of the media.',
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The type of media.',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the media.',
    },
    url: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The url to the file.',
    },
  }),
});
