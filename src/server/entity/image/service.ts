import { Image } from '../../../types/image.type';
import { Service } from '../service';
import { ImageModel } from './model';
import { validate } from './validate';

export const imageService = new Service<Image>(ImageModel, validate);
