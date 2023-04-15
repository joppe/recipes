import { GraphQLList, GraphQLObjectType } from 'graphql';

import { ErrorResultType } from '../error/ErrorResultType';

import { ProductType } from './ProductType';

export const ProductResultType: GraphQLObjectType = new GraphQLObjectType({
  name: 'ProductResult',
  description: 'The result of a product mutation',
  fields: () => ({
    product: {
      type: ProductType,
      description: 'The product where the mutation was applied on.',
    },
    errors: {
      type: new GraphQLList(ErrorResultType),
      description: 'The error messages.',
    },
  }),
});
