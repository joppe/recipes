import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';

import { UnitMutationResult } from './UnitMutationResult';
import { UnitResultType } from './UnitResultType';

type ResolveArgs = {
  id: string;
};

export const deleteUnit = {
  type: UnitResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<UnitMutationResult> => {
    if (userInfo?.userId === undefined) {
      return {
        unit: null,
        errors: [
          { message: 'User must be logged in to be able to do this action' },
        ],
      };
    }

    const unit = await prisma.unit.findUnique({
      where: {
        id,
      },
    });

    if (unit === null) {
      return {
        unit: null,
        errors: [{ message: `Unit with id "${id}" not found` }],
      };
    }

    await prisma.unit.delete({
      where: {
        id,
      },
    });

    return {
      unit,
      errors: [],
    };
  },
};
