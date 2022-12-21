import { Instruction } from '@prisma/client';
import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { InstructionType } from './InstructionType';

export const instructions = {
  type: new GraphQLList(InstructionType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma }: Context,
  ): Promise<Instruction[]> => {
    return await prisma.instruction.findMany();
  },
};
