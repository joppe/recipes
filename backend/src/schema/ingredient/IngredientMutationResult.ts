import { Ingredient } from '@prisma/client';

export type IngredientMutationResult = {
  ingredient: Ingredient | null;
  errors: { message: string }[];
};
