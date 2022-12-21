import { Chef } from '@prisma/client';
import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { ChefType } from './ChefType';

type ResolveArgs = {
  id: string;
};

export const chef = {
  type: ChefType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma }: Context,
  ): Promise<Chef | null> => {
    return await prisma.chef.findUnique({ where: { id } });
  },
};
