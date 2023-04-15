import { Instruction } from '@prisma/client';
import { GraphQLList, GraphQLNonNull } from 'graphql';

import { Context } from '../../server/Context';

import { InstructionType } from './InstructionType';

export const instructions = {
  type: new GraphQLNonNull(
    new GraphQLList(new GraphQLNonNull(InstructionType)),
  ),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma, userInfo }: Context,
  ): Promise<Instruction[]> => {
    if (userInfo?.userId === undefined) {
      return [];
    }

    return await prisma.instruction.findMany();
  },
};
