import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Query {
        ingredients: [Ingredient]
    }

    type Ingredient {
        _id: ID!
        name: String!
        image: String
        description: String
    }
`;
