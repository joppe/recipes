import { gql } from '../../../gql/gql';

export const createProductMutation = gql(/* GraphQL */ `
  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      product {
        name
      }
      errors {
        message
      }
    }
  }
`);
