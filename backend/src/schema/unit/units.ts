import { Unit } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { UnitType } from './UnitType';

export const units = {
  type: new GraphQLList(UnitType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma }: Context,
  ): Promise<Unit[]> => {
    return await prisma.unit.findMany();
  },
};
