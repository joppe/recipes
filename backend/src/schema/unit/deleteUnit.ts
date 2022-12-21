import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
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
    { prisma }: Context,
  ): Promise<UnitMutationResult> => {
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
