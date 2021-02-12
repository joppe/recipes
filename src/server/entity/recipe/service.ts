import { Recipe } from '../../../types/recipe.type';
import { Service } from '../service';
import { RecipeModel } from './model';
import { validate } from './validate';

export const recipeService = new Service<Recipe>(RecipeModel, validate);
