import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { Media } from '../../types';
import { MediaType } from './MediaType';

export const medias = {
  type: new GraphQLList(MediaType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma }: Context,
  ): Promise<Media[]> => {
    const results = await prisma.media.findMany();

    return results.map((result) => ({
      id: result.id,
      type: result.type,
      title: result.title,
      url: result.url,
      chefs: [],
      recipes: [],
      products: [],
      instructions: [],
    }));
  },
};
