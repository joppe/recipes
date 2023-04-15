import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server/Context';

import { ProductMutationResult } from './ProductMutationResult';
import { ProductResultType } from './ProductResultType';

type ResolveArgs = {
  input: {
    name: string;
    description?: string;
    mediaId?: string;
  };
};

const InputCreateProductType = new GraphQLInputObjectType({
  name: 'CreateProductInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    mediaId: { type: GraphQLID },
  },
});

export const createProduct = {
  type: ProductResultType,
  args: {
    input: { type: new GraphQLNonNull(InputCreateProductType) },
  },
  resolve: async (
    _: unknown,
    { input }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<ProductMutationResult> => {
    if (userInfo?.userId === undefined) {
      return {
        product: null,
        errors: [
          { message: 'User must be logged in to be able to do this action' },
        ],
      };
    }

    const { name, description, mediaId } = input;

    const existingProduct = await prisma.product.findFirst({
      where: {
        name,
      },
    });

    if (existingProduct !== null) {
      return {
        product: null,
        errors: [
          { message: `There is already a product with the name "${name}"` },
        ],
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

    const newProduct = await prisma.product.create({
      data: {
        name,
        description: description ?? null,
        mediaId: mediaId ?? null,
      },
    });

    return {
      product: newProduct,
      errors: [],
    };
  },
};
