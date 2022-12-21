import { Product } from '@prisma/client';
import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
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
    return await prisma.product.findUnique({ where: { id } });
  },
};
