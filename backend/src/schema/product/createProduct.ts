import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { Context } from '../../server';
import { Product } from '../../types/Product';
import { ProductMutationResult } from './ProductMutationResult';
import { ProductResultType } from './ProductResultType';

type ResolveArgs = {
  input: {
    name: string;
    description?: string;
  };
};

const inputCreateProductType = new GraphQLInputObjectType({
  name: 'CreateProductInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  },
});

export const createProduct = {
  type: ProductResultType,
  args: {
    input: { type: inputCreateProductType },
  },
  resolve: async (
    _: unknown,
    { input }: ResolveArgs,
    { prisma }: Context,
  ): Promise<ProductMutationResult> => {
    const { name, description } = input;

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

    const payloadProduct: Partial<Product> = {
      name,
    };

    if (description !== undefined) {
      payloadProduct['description'] = description;
    }

    const newProduct = await prisma.product.create({
      data: payloadProduct as Omit<Product, 'media' | 'ingredients'>,
    });

    return {
      product: {
        id: newProduct.id,
        name: newProduct.name,
        description: newProduct.description ?? null,
        media: null,
        ingredients: [],
      },
      errors: [],
    };
  },
};
