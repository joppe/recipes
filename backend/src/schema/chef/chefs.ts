import { Chef } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { ChefType } from './ChefType';

export const chefs = {
  type: new GraphQLList(ChefType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma }: Context,
  ): Promise<Chef[]> => {
    return await prisma.chef.findMany();
  },
};
