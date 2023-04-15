import { gql } from '../../../gql/gql';

export const unitsQuery = gql(/* GraphQL */ `
  query units {
    units {
      id
      name
      abbreviation
    }
  }
`);
