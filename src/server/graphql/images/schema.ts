import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Query {
        images: [Image]
    }

    type Image {
        _id: ID!
        name: String!
        fileName: String!
        contentType: String!
    }
`;
