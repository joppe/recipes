import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      hello: () => 'world!',
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 GraphQl server started at ${url}`);
});
