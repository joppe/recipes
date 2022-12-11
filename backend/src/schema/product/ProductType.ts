import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index';

import { IngredientType } from '../ingredient/IngredientType';
import { MediaType } from '../media/MediaType';

export const ProductType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Product',
  description: 'A product that can be used as ingredient in a recipe.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The record id of the product.',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the product.',
    },
    description: {
      type: GraphQLString,
      description: 'The description of the product.',
    },
    media: {
      type: MediaType,
      description: 'A video or image of the product.',
    },
    ingredients: {
      type: new GraphQLList(IngredientType),
      description: 'The ingredients where this product is used in.',
    },
  }),
});
