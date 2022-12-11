import { Recipe } from '../../types/Recipe';

export type RecipeMutationResult = {
  recipe: Recipe | null;
  errors: { message: string }[];
};
