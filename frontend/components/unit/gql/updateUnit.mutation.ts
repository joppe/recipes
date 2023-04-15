import { gql } from '../../../gql/gql';

export const updateUnitMutation = gql(/* GraphQL */ `
  mutation updateUnit($id: ID!, $input: UpdateUnitInput!) {
    updateUnit(id: $id, input: $input) {
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
