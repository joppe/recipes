import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { MediaMutationResult } from './MediaMutationResult';
import { MediaResultType } from './MediaResultType';

type ResolveArgs = {
  id: string;
};

export const deleteMedia = {
  type: MediaResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
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

    const media = await prisma.media.findUnique({
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

    await prisma.media.delete({
      where: {
        id,
      },
    });

    return {
      media,
      errors: [],
    };
  },
};
