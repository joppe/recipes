import { Chef } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { ChefType } from './ChefType';

export const chefs = {
  type: new GraphQLList(ChefType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma, userInfo }: Context,
  ): Promise<Chef[]> => {
    if (userInfo?.userId === undefined) {
      return [];
    }

    return await prisma.chef.findMany();
  },
};
