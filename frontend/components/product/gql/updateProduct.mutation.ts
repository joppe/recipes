import { gql } from '../../../gql/gql';

export const updateProductMutation = gql(/* GraphQL */ `
  mutation updateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      product {
        name
      }
      errors {
        message
      }
    }
  }
`);
