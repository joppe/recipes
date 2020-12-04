import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Mutation {
        uploadUrl(fileName: String!, contentType: String!): SignedUrl!
    }

    type SignedUrl {
        url: String!
        fileName: String!
        contentType: String!
    }
`;
