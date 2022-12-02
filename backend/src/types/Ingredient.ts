import { Product } from './Product';
import { Recipe } from './Recipe';
import { Unit } from './Unit';

export type Ingredient = {
  id: string;
  amount: number;
  preperation: string;
  recipe: Recipe;
  product: Product;
  unit: Unit;
};
