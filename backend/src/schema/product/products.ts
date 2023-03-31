import { ProductType } from './ProductType';
import { Product } from '@prisma/client';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';

export const products = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProductType))),
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
