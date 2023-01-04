import http from 'http';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { getUserInfoFromToken } from '../auth/getUserInfoFromToken';
import { loginHandler } from '../auth/loginHandler';
import { chefsLoader } from '../loaders/chefsLoader';
import { ingredientsLoader } from '../loaders/ingredientsLoader';
import { mealsLoader } from '../loaders/mealsLoader';
import { mediaLoader } from '../loaders/mediaLoader';
import { productsLoader } from '../loaders/productsLoader';
import { recipesLoader } from '../loaders/recipesLoader';
import { unitsLoader } from '../loaders/unitsLoader';
import { prisma } from '../prisma/client';
import { schema } from '../schema/schema';
import { Context } from './Context';

const PORT = 4000;

export async function start() {
  const login = loginHandler(prisma);
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  app.use('/login', bodyParser.json());

  app.post('/login', async (req, res) => {
    const token = await login(req.body.email, req.body.password);

    if (token === null) {
      res.status(401).json({});
    } else {
      res.status(200).json({ authToken: token });
    }
  });

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }): Promise<Context> => {
        const userInfo = getUserInfoFromToken(
          req.headers['auth-token'] as string,
        );

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
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve),
  );

  console.log(`🚀  Server ready at: https://localhost:${PORT}/`);
}
