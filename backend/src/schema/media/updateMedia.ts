import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server/Context';

import { MediaMutationResult } from './MediaMutationResult';
import { MediaResultType } from './MediaResultType';

type ResolveArgs = {
  id: string;
  input: {
    type: string;
    title: string;
    url: string;
  };
};

const InputUpdateMediaType = new GraphQLInputObjectType({
  name: 'UpdateMediaInput',
  fields: {
    type: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const updateMedia = {
  type: MediaResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: new GraphQLNonNull(InputUpdateMediaType) },
  },
  resolve: async (
    _: unknown,
    { id, input }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<MediaMutationResult> => {
    if (userInfo?.userId === undefined) {
      return {
        media: null,
        errors: [
          { message: 'User must be logged in to be able to do this action' },
        ],
      };
    }

    const { type, title, url } = input;

    const media = await prisma.media.findFirst({
      where: {
        id,
      },
    });

    if (media === null) {
      return {
        media: null,
        errors: [{ message: `Media with id "${id}" not found` }],
      };
    }

    const updatedMedia = await prisma.media.update({
      where: { id },
      data: {
        type,
        title,
        url,
      },
    });

    return {
      media: updatedMedia,
      errors: [],
    };
  },
};
