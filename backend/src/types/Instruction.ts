import { Media } from './Media';
import { Recipe } from './Recipe';

export type Instruction = {
  id: string;
  order: number;
  text: string;
  media: Media | null;
  recipe: Recipe;
};
