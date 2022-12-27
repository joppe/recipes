import { Media } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { MediaType } from './MediaType';

export const medias = {
  type: new GraphQLList(MediaType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma, userInfo }: Context,
  ): Promise<Media[]> => {
    if (userInfo?.userId === undefined) {
      return [];
    }

    return await prisma.media.findMany();
  },
};
