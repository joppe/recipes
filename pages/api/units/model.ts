import { model, models } from 'mongoose';

import { unitSchema } from './schema';

// When in watch mode the model can already be declared, therefore use `??`
export const UnitModel = models.Unit ?? model('Unit', unitSchema);
