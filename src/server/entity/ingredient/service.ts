import { Ingredient } from '../../../types/ingredient.type';
import { Service } from '../service';
import { IngredientModel } from './model';
import { validate } from './validate';

export const ingredientService = new Service<Ingredient>(
    IngredientModel,
    validate,
);
