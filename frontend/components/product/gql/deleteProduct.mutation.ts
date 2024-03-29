import { gql } from '../../../gql/gql';

export const deleteProductMutation = gql(/* GraphQL */ `
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      product {
        name
      }
      errors {
        message
      }
    }
  }
`);
