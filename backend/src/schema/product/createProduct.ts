import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { Context } from '../../server/Context';

import { ProductMutationResult } from './ProductMutationResult';
import { ProductResultType } from './ProductResultType';

type ResolveArgs = {
  input: {
    name: string;
    description?: string;
    media?: {
      type: string;
      title: string;
      url: string;
    };
  };
};

const InputCreateProductMediaType = new GraphQLInputObjectType({
  name: 'CreateProductMediaInput',
  fields: {
    type: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const InputCreateProductType = new GraphQLInputObjectType({
  name: 'CreateProductInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    media: { type: InputCreateProductMediaType },
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

    const { name, description, media } = input;
    let linkedMedia = null;

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

    if (media !== undefined) {
      linkedMedia = await prisma.media.create({
        data: {
          type: media.type,
          title: media.title,
          url: media.url,
        },
      });
      console.log(linkedMedia);
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description: description ?? null,
        mediaId: linkedMedia?.id ?? null,
      },
    });

    return {
      product: newProduct,
      errors: [],
    };
  },
};
