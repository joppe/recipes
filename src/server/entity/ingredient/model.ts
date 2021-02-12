import { model, models } from 'mongoose';

import { ingredientSchema } from './schema';

// When in watch mode the model can already be declared, therefore use `??`
export const IngredientModel =
    models.Ingredient ?? model('Ingredient', ingredientSchema);
