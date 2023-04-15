import { gql } from '../../../gql/gql';

export const unitQuery = gql(/* GraphQL */ `
  query unit($id: ID!) {
    unit(id: $id) {
      id
      name
      abbreviation
    }
  }
`);
