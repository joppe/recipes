import { gql } from '../../../gql/gql';

export const deleteUnitMutation = gql(/* GraphQL */ `
  mutation deleteUnit($id: ID!) {
    deleteUnit(id: $id) {
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
