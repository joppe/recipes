import { GraphQLList, GraphQLObjectType } from 'graphql';

import { ErrorResultType } from '../error/ErrorResultType';
import { MediaType } from './MediaType';

export const MediaResultType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MediaResult',
  description: 'The result of a media mutation',
  fields: () => ({
    media: {
      type: MediaType,
      description: 'The media where the mutation was applied on.',
    },
    errors: {
      type: new GraphQLList(ErrorResultType),
      description: 'The error messages.',
    },
  }),
});
