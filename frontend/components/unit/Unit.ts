import { Unit as UnitGql } from '../../gql/graphql';

export type Unit = Omit<UnitGql, '__typename'>;
