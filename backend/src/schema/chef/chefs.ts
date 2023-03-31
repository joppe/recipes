import { ChefType } from './ChefType';
import { Chef } from '@prisma/client';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';

export const chefs = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ChefType))),
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
