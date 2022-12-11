import { Chef } from './Chef';
import { Instruction } from './Instruction';
import { Product } from './Product';
import { Recipe } from './Recipe';

export type Media = {
  id: string;
  type: string;
  title: string;
  url: string;
  chefs: Chef[];
  recipes: Recipe[];
  products: Product[];
  instructions: Instruction[];
};
