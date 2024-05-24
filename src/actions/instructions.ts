'use server';

import { eq } from 'drizzle-orm';

import db from '@/db/drizzle';
import { InstructionFormData, instructions } from '@/db/schema';

export async function getInstructions() {
  return db.select().from(instructions).orderBy(instructions.order);
}

export async function addInstruction(instruction: InstructionFormData) {
  await db.insert(instructions).values(instruction);
}

export async function deleteInstruction(id: number) {
  await db.delete(instructions).where(eq(instructions.id, id));
}

export async function updateInstruction(instruction: InstructionFormData) {
  if (instruction.id === undefined) {
    throw new Error('Instruction ID is required');
  }

  await db
    .update(instructions)
    .set(instruction)
    .where(eq(instructions.id, instruction.id));
}
