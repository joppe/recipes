import { Meal } from '@prisma/client';

export type MealMutationResult = {
  meal: Meal | null;
  errors: { message: string }[];
};
