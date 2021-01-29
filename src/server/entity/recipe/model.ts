import { model, models } from 'mongoose';

import { recipeSchema } from './schema';

// When in watch mode the model can already be declared, therefore use `??`
export const RecipeModel = models.Recipe ?? model('Recipe', recipeSchema);
