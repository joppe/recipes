import { Product as ProductGql } from '../../gql/graphql';

export type Product = Omit<ProductGql, 'ingredients' | 'media' | '__typename'>;
