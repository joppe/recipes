import { Unit } from '@prisma/client';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';

import { UnitType } from './UnitType';

export const units = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UnitType))),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma, userInfo }: Context,
  ): Promise<Unit[]> => {
    if (userInfo?.userId === undefined) {
      return [];
    }

    return await prisma.unit.findMany();
  },
};
