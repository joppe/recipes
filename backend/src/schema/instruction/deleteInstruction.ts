import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { InstructionMutationResult } from './InstructionMutationResult';
import { InstructionResultType } from './InstructionResultType';

type ResolveArgs = {
  id: string;
};

export const deleteInstruction = {
  type: InstructionResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma }: Context,
  ): Promise<InstructionMutationResult> => {
    const instruction = await prisma.instruction.findUnique({ where: { id } });

    if (instruction === null) {
      return {
        instruction: null,
        errors: [{ message: `Instruction with id "${id}" not found` }],
      };
    }

    await prisma.instruction.delete({ where: { id } });

    return {
      instruction,
      errors: [],
    };
  },
};
