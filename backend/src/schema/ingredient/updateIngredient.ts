import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server/Context';
import { IngredientMutationResult } from './IngredientMutationResult';
import { IngredientResultType } from './IngredientResultType';

type ResolveArgs = {
  id: string;
  input: {
    amount: number;
    preparation: string;
    recipeId: string;
    productId: string;
    unitId: string;
  };
};

const InputUpdateIngredientType = new GraphQLInputObjectType({
  name: 'UpdateIngredientInput',
  fields: {
    amount: { type: new GraphQLNonNull(GraphQLFloat) },
    preparation: { type: new GraphQLNonNull(GraphQLString) },
    recipeId: { type: new GraphQLNonNull(GraphQLID) },
    productId: { type: new GraphQLNonNull(GraphQLID) },
    unitId: { type: new GraphQLNonNull(GraphQLID) },
  },
});

export const updateIngredient = {
  type: IngredientResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: new GraphQLNonNull(InputUpdateIngredientType) },
  },
  resolve: async (
    _: unknown,
    { id, input }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<IngredientMutationResult> => {
    if (userInfo?.userId === undefined) {
      return {
        ingredient: null,
        errors: [
          { message: 'User must be logged in to be able to do this action' },
        ],
      };
    }

    const { amount, preparation, recipeId, productId, unitId } = input;

    const ingredient = await prisma.ingredient.findUnique({ where: { id } });

    if (ingredient === null) {
      return {
        ingredient: null,
        errors: [{ message: `Ingredient with id "${id}" not found` }],
      };
    }

    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (recipe === null) {
      return {
        ingredient: null,
        errors: [{ message: `Recipe with id "${recipeId}" not found.` }],
      };
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (product === null) {
      return {
        ingredient: null,
        errors: [{ message: `Product with id "${productId}" not found.` }],
      };
    }

    const unit = await prisma.unit.findUnique({
      where: {
        id: unitId,
      },
    });

    if (unit === null) {
      return {
        ingredient: null,
        errors: [{ message: `Unit with id "${unitId}" not found.` }],
      };
    }

    const updatedIngredient = await prisma.ingredient.update({
      where: { id },
      data: {
        amount,
        preparation,
        recipeId,
        productId,
        unitId,
      },
    });

    return {
      ingredient: updatedIngredient,
      errors: [],
    };
  },
};
