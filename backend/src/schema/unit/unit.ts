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
    { prisma, userInfo }: Context,
  ): Promise<Unit | null> => {
    if (userInfo?.userId === undefined) {
      return null;
    }

    return await prisma.unit.findUnique({ where: { id } });
  },
};
