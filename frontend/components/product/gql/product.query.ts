import { gql } from '../../../gql/gql';

export const productQuery = gql(/* GraphQL */ `
  query product($id: ID!) {
    product(id: $id) {
      id
      name
      description
      media {
        type
        title
        url
      }
    }
  }
`);
