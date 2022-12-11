import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { Unit } from '../../types/Unit';
import { UnitType } from './UnitType';

export const units = {
  type: new GraphQLList(UnitType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma }: Context,
  ): Promise<Unit[]> => {
    const results = await prisma.unit.findMany();

    return results.map((result) => ({
      id: result.id,
      name: result.name,
      abbreviation: result.abbreviation,
    }));
  },
};
