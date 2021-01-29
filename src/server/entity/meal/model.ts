import { model, models } from 'mongoose';

import { mealSchema } from './schema';

// When in watch mode the model can already be declared, therefore use `??`
export const MealModel = models.Meal ?? model('Meal', mealSchema);
