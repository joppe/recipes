import { model, models } from 'mongoose';

import { imageSchema } from './schema';

// When in watch mode the model can already be declared, therefore use `??`
export const ImageModel = models.Image ?? model('Image', imageSchema);
