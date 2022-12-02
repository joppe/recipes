import {
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index';

import { ProductType } from '../prodcut/ProductType';
import { RecipeType } from '../recipe/RecipeType';
import { UnitType } from '../unit/UnitType';

export const IngredientType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Ingredient',
  description: 'An ingredient for a recipe.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The record id of the ingredient.',
    },
    amount: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'The amount of product needed for the recipe.',
    },
    preperation: {
      type: new GraphQLNonNull(GraphQLString),
      description:
        'The preparation needed for this product when used in this recipe.',
    },
    recipe: {
      type: new GraphQLNonNull(RecipeType),
      description: 'The recipe this ingredient is used in.',
    },
    product: {
      type: new GraphQLNonNull(ProductType),
      description: 'The product that is used as an ingredient.',
    },
    unit: {
      type: new GraphQLNonNull(UnitType),
      description:
        'The unit that applies on the amount provided for this ingredient.',
    },
  }),
});
