import { Unit } from '@prisma/client';

export type UnitMutationResult = {
  unit: Unit | null;
  errors: { message: string }[];
};
