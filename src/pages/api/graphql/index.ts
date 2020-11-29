import { ApolloServer, gql } from 'apollo-server-micro';

import { ingredientService } from '../../../server/type/ingredient/service';

const typeDefs = gql`
    type Ingredient {
        _id: ID!
        name: String!
        image: String
        description: String
    }
    type Query {
        ingredients: [Ingredient]
    }
`;

const resolvers = {
    Query: {
        ingredients: async () => {
            return ingredientService.getAll({ name: 'asc' });
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
});

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
