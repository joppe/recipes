import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { Context } from '../../server';
import { MediaMutationResult } from './MediaMutationResult';
import { MediaResultType } from './MediaResultType';

type ResolveArgs = {
  input: {
    type: string;
    title: string;
    url: string;
  };
};

const InputCreateMediaType = new GraphQLInputObjectType({
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
    input: { type: new GraphQLNonNull(InputCreateMediaType) },
  },
  resolve: async (
    _: unknown,
    { input }: ResolveArgs,
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

    const newMedia = await prisma.media.create({
      data: {
        type,
        title,
        url,
      },
    });

    return {
      media: newMedia,
      errors: [],
    };
  },
};
