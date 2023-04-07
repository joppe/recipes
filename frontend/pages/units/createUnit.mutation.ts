import { gql } from '../../gql/gql';

export const createUnitMutation = gql(/* GraphQL */ `
  mutation createUnit($input: CreateUnitInput!) {
    createUnit(input: $input) {
      unit {
        name
        abbreviation
      }
      errors {
        message
      }
    }
  }
`);
