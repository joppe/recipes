import { Product } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { ProductType } from './ProductType';

export const products = {
  type: new GraphQLList(ProductType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma, userInfo }: Context,
  ): Promise<Product[]> => {
    if (userInfo?.userId === undefined) {
      return [];
    }

    return await prisma.product.findMany();
  },
};
