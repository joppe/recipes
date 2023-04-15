import { Instruction } from '@prisma/client';
import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';

import { InstructionType } from './InstructionType';

type ResolveArgs = {
  id: string;
};

export const instruction = {
  type: InstructionType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<Instruction | null> => {
    if (userInfo?.userId === undefined) {
      return null;
    }

    return await prisma.instruction.findUnique({ where: { id } });
  },
};
