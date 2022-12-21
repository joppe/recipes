import { Unit } from '@prisma/client';
import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
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
    return await prisma.unit.findUnique({ where: { id } });
  },
};
