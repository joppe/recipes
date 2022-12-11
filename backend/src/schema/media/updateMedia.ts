import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server';
import { Media } from '../../types';
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

const inputUpdateMediaType = new GraphQLInputObjectType({
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
    input: { type: new GraphQLNonNull(inputUpdateMediaType) },
  },
  resolve: async (
    _: unknown,
    { id, input }: ResolveArgs,
    { prisma }: Context,
  ): Promise<MediaMutationResult> => {
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

    const payloadMedia: Partial<Media> = {
      type,
      title,
      url,
    };

    const updatedMedia = await prisma.media.update({
      where: { id },
      data: payloadMedia as Omit<
        Media,
        'chefs' | 'recipes' | 'products' | 'instructions'
      >,
    });

    return {
      media: {
        id: updatedMedia.id,
        type: updatedMedia.type,
        title: updatedMedia.title,
        url: updatedMedia.url,
        chefs: [],
        recipes: [],
        products: [],
        instructions: [],
      },
      errors: [],
    };
  },
};
