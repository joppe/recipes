import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { Context } from '../../server';
import { Media } from '../../types';
import { MediaMutationResult } from './MediaMutationResult';
import { MediaResultType } from './MediaResultType';

type ResolveArgs = {
  input: {
    type: string;
    title: string;
    url: string;
  };
};

const inputCreateMediaType = new GraphQLInputObjectType({
  name: 'CreateMediaInput',
  fields: {
    type: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const createMedia = {
  type: MediaResultType,
  args: {
    input: { type: inputCreateMediaType },
  },
  resolve: async (
    _: unknown,
    { input }: ResolveArgs,
    { prisma }: Context,
  ): Promise<MediaMutationResult> => {
    const { type, title, url } = input;

    const existingMedia = await prisma.media.findFirst({
      where: {
        url,
      },
    });

    if (existingMedia !== null) {
      return {
        media: null,
        errors: [{ message: `There is already a media with the url "${url}"` }],
      };
    }

    const payloadMedia: Partial<Media> = {
      type,
      title,
      url,
    };

    const newMedia = await prisma.media.create({
      data: payloadMedia as Omit<
        Media,
        'chefs' | 'recipes' | 'products' | 'instructions'
      >,
    });

    return {
      media: {
        id: newMedia.id,
        type: newMedia.type,
        title: newMedia.title,
        url: newMedia.url,
        chefs: [],
        recipes: [],
        products: [],
        instructions: [],
      },
      errors: [],
    };
  },
};
