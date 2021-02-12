import { User } from '../../../types/user.type';
import { Service } from '../service';
import { UserModel } from './model';
import { validate } from './validate';

export const userService = new Service<User>(UserModel, validate);
