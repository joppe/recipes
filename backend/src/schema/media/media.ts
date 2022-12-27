import { Media } from '@prisma/client';
import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { MediaType } from './MediaType';

type ResolveArgs = {
  id: string;
};

export const media = {
  type: MediaType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<Media | null> => {
    if (userInfo?.userId === undefined) {
      return null;
    }

    return await prisma.media.findUnique({ where: { id } });
  },
};
