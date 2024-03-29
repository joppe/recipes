import { gql } from '../../../gql/gql';

export const productsQuery = gql(/* GraphQL */ `
  query products {
    products {
      id
      name
    }
  }
`);
