import { Recipe } from '@prisma/client';

export type RecipeMutationResult = {
  recipe: Recipe | null;
  errors: { message: string }[];
};
