import { model, models } from 'mongoose';

import { userSchema } from './schema';

// When in watch mode the model can already be declared, therefore use `??`
export const UserModel = models.User ?? model('User', userSchema);
