import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';

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
};

async function start() {
  const prisma = new PrismaClient();

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }): Promise<Context> => ({
      prisma,
    }),
  });

  console.log(`🚀  Server ready at: ${url}`);
}

start();
