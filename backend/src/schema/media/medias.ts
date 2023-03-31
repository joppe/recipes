import { MediaType } from './MediaType';
import { Media } from '@prisma/client';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';

export const medias = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MediaType))),
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
