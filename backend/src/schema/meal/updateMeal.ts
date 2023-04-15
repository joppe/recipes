import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server/Context';

import { MealMutationResult } from './MealMutationResult';
import { MealResultType } from './MealResultType';

type ResolveArgs = {
  id: string;
  input: {
    date: string;
    score: number;
    chefId: string;
    recipeId: string;
  };
};

const InputUpdateMealType = new GraphQLInputObjectType({
  name: 'UpdateMealInput',
  fields: {
    date: { type: new GraphQLNonNull(GraphQLString) },
    score: { type: new GraphQLNonNull(GraphQLInt) },
    chefId: { type: new GraphQLNonNull(GraphQLID) },
    recipeId: { type: new GraphQLNonNull(GraphQLID) },
  },
});

export const updateMeal = {
  type: MealResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: new GraphQLNonNull(InputUpdateMealType) },
  },
  resolve: async (
    _: unknown,
    { id, input }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<MealMutationResult> => {
    if (userInfo?.userId === undefined) {
      return {
        meal: null,
        errors: [
          { message: 'User must be logged in to be able to do this action' },
        ],
      };
    }

    const { date, score, chefId, recipeId } = input;

    const meal = await prisma.meal.findUnique({ where: { id } });

    if (meal === null) {
      return {
        meal: null,
        errors: [{ message: `Meal with id "${id}" not found` }],
      };
    }

    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (recipe === null) {
      return {
        meal: null,
        errors: [{ message: `Recipe with id "${recipeId}" not found.` }],
      };
    }

    const chef = await prisma.chef.findUnique({
      where: {
        id: chefId,
      },
    });

    if (chef === null) {
      return {
        meal: null,
        errors: [{ message: `Chef with id "${chefId}" not found.` }],
      };
    }

    const updatedMeal = await prisma.meal.update({
      where: { id },
      data: {
        date: new Date(date),
        score,
        recipeId,
        chefId,
      },
    });

    return {
      meal: updatedMeal,
      errors: [],
    };
  },
};
