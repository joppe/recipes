import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const UploadUrlType: GraphQLObjectType = new GraphQLObjectType({
  name: 'UploadUrl',
  description: 'An URL where an image can be uploaded to.',
  fields: () => ({
    url: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The URL.',
    },
    filename: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the file.',
    },
  }),
});
