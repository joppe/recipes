import { Recipe } from '../../types';

export type RecipeMutationResult = {
  recipe: Recipe | null;
  errors: { message: string }[];
};
