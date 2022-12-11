import { Unit } from '../../types/Unit';

export type UnitMutationResult = {
  unit: Unit | null;
  errors: { message: string }[];
};
