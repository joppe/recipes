import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
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

import { getUserInfoFromToken } from './auth/getUserInfoFromToken';
import { chefsLoader } from './loaders/chefsLoader';
import { ingredientsLoader } from './loaders/ingredientsLoader';
import { mealsLoader } from './loaders/mealsLoader';
import { mediaLoader } from './loaders/mediaLoader';
import { productsLoader } from './loaders/productsLoader';
import { recipesLoader } from './loaders/recipesLoader';
import { unitsLoader } from './loaders/unitsLoader';
import { prisma } from './prisma/client';
import { schema } from './schema/schema';

export type UserInfo = {
  userId: string;
};

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

async function start() {
  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }): Promise<Context> => {
      const userInfo = getUserInfoFromToken(req.headers.authorization);

      return {
        prisma,
        mediaLoader: mediaLoader(prisma),
        ingredientsLoader: ingredientsLoader(prisma),
        unitsLoader: unitsLoader(prisma),
        recipesLoader: recipesLoader(prisma),
        chefsLoader: chefsLoader(prisma),
        mealsLoader: mealsLoader(prisma),
        productsLoader: productsLoader(prisma),
        userInfo,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

start();
