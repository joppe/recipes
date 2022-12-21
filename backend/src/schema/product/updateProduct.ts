import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server';
import { ProductMutationResult } from './ProductMutationResult';
import { ProductResultType } from './ProductResultType';

type ResolveArgs = {
  id: string;
  input: {
    name: string;
    description?: string;
    mediaId?: string;
  };
};

const InputUpdateProductType = new GraphQLInputObjectType({
  name: 'UpdateProductInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    mediaId: { type: GraphQLID },
  },
});

export const updateProduct = {
  type: ProductResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: new GraphQLNonNull(InputUpdateProductType) },
  },
  resolve: async (
    _: unknown,
    { id, input }: ResolveArgs,
    { prisma }: Context,
  ): Promise<ProductMutationResult> => {
    const { name, description, mediaId } = input;

    const product = await prisma.product.findUnique({ where: { id } });

    if (product === null) {
      return {
        product: null,
        errors: [{ message: `Product with id "${id}" not found` }],
      };
    }

    if (mediaId !== undefined) {
      const media = await prisma.media.findUnique({
        where: {
          id: mediaId,
        },
      });

      if (media === null) {
        return {
          product: null,
          errors: [{ message: `Media with id "${mediaId}" not found.` }],
        };
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description: description ?? null,
        mediaId: mediaId ?? null,
      },
    });

    return {
      product: updatedProduct,
      errors: [],
    };
  },
};
