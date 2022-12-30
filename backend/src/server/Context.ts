import {
  Chef,
  Ingredient,
  Meal,
  Media,
  PrismaClient,
  Product,
  Recipe,
  Unit,
} from '@prisma/client';
import DataLoader from 'dataloader';

import { UserInfo } from './UserInfo';

export type Context = {
  prisma: PrismaClient;
  mediaLoader: DataLoader<string, Media>;
  ingredientsLoader: DataLoader<string, Ingredient>;
  unitsLoader: DataLoader<string, Unit>;
  recipesLoader: DataLoader<string, Recipe>;
  chefsLoader: DataLoader<string, Chef>;
  mealsLoader: DataLoader<string, Meal>;
  productsLoader: DataLoader<string, Product>;
  userInfo: null | UserInfo;
};
