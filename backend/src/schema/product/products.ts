import { Product } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { ProductType } from './ProductType';

export const products = {
  type: new GraphQLList(ProductType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma }: Context,
  ): Promise<Product[]> => {
    return await prisma.product.findMany();
  },
};
