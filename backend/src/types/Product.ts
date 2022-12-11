import { Ingredient } from './Ingredient';
import { Media } from './Media';

export type Product = {
  id: string;
  name: string;
  description: string | null;
  media: Media | null;
  ingredients: Ingredient[];
};
