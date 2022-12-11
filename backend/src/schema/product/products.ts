import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { Product } from '../../types';
import { ProductType } from './ProductType';

export const products = {
  type: new GraphQLList(ProductType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma }: Context,
  ): Promise<Product[]> => {
    const results = await prisma.product.findMany();

    return results.map((result) => ({
      id: result.id,
      name: result.name,
      description: result.description,
      media: null,
      ingredients: [],
    }));
  },
};
