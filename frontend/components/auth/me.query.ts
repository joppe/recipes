import { gql } from '../../gql/gql';

export const meQuery = gql(/* GraphQL */ `
  query me {
    me {
      id
      name
      email
    }
  }
`);
