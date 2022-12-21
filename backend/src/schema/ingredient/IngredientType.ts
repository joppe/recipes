import { Ingredient, Product, Recipe, Unit } from '@prisma/client';
import {
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index';

import { Context } from '../../server';
import { ProductType } from '../product/ProductType';
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
    preparation: {
      type: new GraphQLNonNull(GraphQLString),
      description:
        'The preparation needed for this product when used in this recipe.',
    },
    recipe: {
      type: new GraphQLNonNull(RecipeType),
      description: 'The recipe this ingredient is used in.',
      resolve: async (
        ingredient: Ingredient,
        _: unknown,
        { recipesLoader }: Context,
      ): Promise<Recipe> => {
        return recipesLoader.load(ingredient.recipeId);
      },
    },
    product: {
      type: new GraphQLNonNull(ProductType),
      description: 'The product that is used as an ingredient.',
      resolve: async (
        ingredient: Ingredient,
        _: unknown,
        { productsLoader }: Context,
      ): Promise<Product> => {
        return productsLoader.load(ingredient.productId);
      },
    },
    unit: {
      type: new GraphQLNonNull(UnitType),
      description:
        'The unit that applies on the amount provided for this ingredient.',
      resolve: async (
        ingredient: Ingredient,
        _: unknown,
        { unitsLoader }: Context,
      ): Promise<Unit> => {
        return unitsLoader.load(ingredient.unitId);
      },
    },
  }),
});
