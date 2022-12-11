import { Unit } from '../../types';

export type UnitMutationResult = {
  unit: Unit | null;
  errors: { message: string }[];
};
