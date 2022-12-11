import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { Media } from '../../types';
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
    { prisma }: Context,
  ): Promise<Media | null> => {
    const media = await prisma.media.findUnique({ where: { id } });

    if (media === null) {
      return null;
    }

    return {
      id: media.id,
      type: media.type,
      title: media.title,
      url: media.url,
      chefs: [],
      recipes: [],
      products: [],
      instructions: [],
    };
  },
};
