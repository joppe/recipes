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

import { chefsLoader } from './loaders/chefsLoader';
import { ingredientsLoader } from './loaders/ingredientsLoader';
import { mealsLoader } from './loaders/mealsLoader';
import { mediaLoader } from './loaders/mediaLoader';
import { productsLoader } from './loaders/productsLoader';
import { recipesLoader } from './loaders/recipesLoader';
import { unitsLoader } from './loaders/unitsLoader';
import { prisma } from './prisma/client';
import { schema } from './schema/schema';

/**
 * https://github.com/harblaith7/GraphQL-Course-Udemy
 * https://github.com/arcticmatt/graphql_server_reference_codegen
 * https://github.com/arcticmatt/graphql_server_reference
 * https://medium.com/swlh/graphql-js-vs-typegraphql-vs-graphql-nexus-2a8036deb851
 * https://www.apollographql.com/docs/apollo-server/getting-started
 * https://adityasridhar.com/posts/what-is-a-mutation-in-graphql-and-how-to-use-it
 * https://github.com/aditya-sridhar/graphql-mutations-with-nodejs
 * https://blog.logrocket.com/complete-guide-to-graphql-playground/
 */

export type Context = {
  prisma: PrismaClient;
  mediaLoader: DataLoader<string, Media>;
  ingredientsLoader: DataLoader<string, Ingredient>;
  unitsLoader: DataLoader<string, Unit>;
  recipesLoader: DataLoader<string, Recipe>;
  chefsLoader: DataLoader<string, Chef>;
  mealsLoader: DataLoader<string, Meal>;
  productsLoader: DataLoader<string, Product>;
};

async function start() {
  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }): Promise<Context> => ({
      prisma,
      mediaLoader: mediaLoader(prisma),
      ingredientsLoader: ingredientsLoader(prisma),
      unitsLoader: unitsLoader(prisma),
      recipesLoader: recipesLoader(prisma),
      chefsLoader: chefsLoader(prisma),
      mealsLoader: mealsLoader(prisma),
      productsLoader: productsLoader(prisma),
    }),
  });

  console.log(`🚀  Server ready at: ${url}`);
}

start();
