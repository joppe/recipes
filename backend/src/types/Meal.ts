import { Chef } from './Chef';
import { Recipe } from './Recipe';

export type Meal = {
  id: string;
  date: Date;
  score: number | null;
  chef: Chef;
  recipe: Recipe;
};
