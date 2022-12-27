import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { ProductMutationResult } from './ProductMutationResult';
import { ProductResultType } from './ProductResultType';

type ResolveArgs = {
  id: string;
};

export const deleteProduct = {
  type: ProductResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
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

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (product === null) {
      return {
        product: null,
        errors: [{ message: `Product with id "${id}" not found` }],
      };
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return {
      product,
      errors: [],
    };
  },
};
