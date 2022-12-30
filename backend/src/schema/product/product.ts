import { Product } from '@prisma/client';
import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';
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
    { prisma, userInfo }: Context,
  ): Promise<Product | null> => {
    if (userInfo?.userId === undefined) {
      return null;
    }

    return await prisma.product.findUnique({ where: { id } });
  },
};
