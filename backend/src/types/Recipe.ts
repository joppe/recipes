import { Ingredient } from './Ingredient';
import { Instruction } from './Instruction';
import { Meal } from './Meal';
import { Media } from './Media';

export type Recipe = {
  id: string;
  name: string;
  preparation_time: number | null;
  cooking_time: number | null;
  difficulty: number;
  course: string | null;
  servings: number;
  source: string | null;
  media: Media | null;
  meals: Meal[];
  instructions: Instruction[];
  ingredient: Ingredient[];
};
