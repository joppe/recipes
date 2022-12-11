import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { Unit } from '../../types/Unit';
import { UnitType } from './UnitType';

type ResolveArgs = {
  id: string;
};

export const unit = {
  type: UnitType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma }: Context,
  ): Promise<Unit | null> => {
    const unit = await prisma.unit.findUnique({ where: { id } });

    if (unit === null) {
      return null;
    }

    return {
      id: unit.id,
      name: unit.name,
      abbreviation: unit.abbreviation,
    };
  },
};
