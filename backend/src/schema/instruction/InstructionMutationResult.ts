import { Instruction } from '@prisma/client';

export type InstructionMutationResult = {
  instruction: Instruction | null;
  errors: { message: string }[];
};
