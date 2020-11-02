import { model, models } from 'mongoose';

import { dishSchema } from './schema';

// When in watch mode the model can already be declared, therefore use `??`
export const DishModel = models.Dish ?? model('Dish', dishSchema);
