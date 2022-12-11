import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { Product } from '../../types/Product';
import { ProductType } from './ProductType';

type ResolveArgs = {
  id: string;
};

export const product = {
  type: ProductType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma }: Context,
  ): Promise<Product | null> => {
    const product = await prisma.product.findUnique({ where: { id } });

    if (product === null) {
      return null;
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      media: null,
      ingredients: [],
    };
  },
};
