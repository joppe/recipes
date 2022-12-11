import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server';
import { Product } from '../../types';
import { ProductMutationResult } from './ProductMutationResult';
import { ProductResultType } from './ProductResultType';

type ResolveArgs = {
  id: string;
  input: {
    name: string;
    description?: string;
  };
};

const inputUpdateProductType = new GraphQLInputObjectType({
  name: 'UpdateProductInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  },
});

export const updateProduct = {
  type: ProductResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: new GraphQLNonNull(inputUpdateProductType) },
  },
  resolve: async (
    _: unknown,
    { id, input }: ResolveArgs,
    { prisma }: Context,
  ): Promise<ProductMutationResult> => {
    const { name, description } = input;

    const product = await prisma.product.findUnique({ where: { id } });

    if (product === null) {
      return {
        product: null,
        errors: [{ message: `Product with id "${id}" not found` }],
      };
    }

    const payloadProduct: Partial<Product> = {
      name,
    };

    if (description !== undefined) {
      payloadProduct['description'] = description;
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: payloadProduct as Omit<
        Product,
        'media' | 'meals' | 'instructions' | 'ingredients'
      >,
    });

    return {
      product: {
        id: updatedProduct.id,
        name: updatedProduct.name,
        description: updatedProduct.description ?? null,
        media: null,
        ingredients: [],
      },
      errors: [],
    };
  },
};
