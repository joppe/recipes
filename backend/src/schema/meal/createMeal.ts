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
  input: {
    date: string;
    score: number;
    chefId: string;
    recipeId: string;
  };
};

const InputCreateMealType = new GraphQLInputObjectType({
  name: 'CreateMealInput',
  fields: {
    date: { type: new GraphQLNonNull(GraphQLString) },
    score: { type: new GraphQLNonNull(GraphQLInt) },
    chefId: { type: new GraphQLNonNull(GraphQLID) },
    recipeId: { type: new GraphQLNonNull(GraphQLID) },
  },
});

export const createMeal = {
  type: MealResultType,
  args: {
    input: { type: new GraphQLNonNull(InputCreateMealType) },
  },
  resolve: async (
    _: unknown,
    { input }: ResolveArgs,
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

    const existingMeal = await prisma.meal.findFirst({
      where: {
        date: new Date(date),
      },
    });

    if (existingMeal !== null) {
      return {
        meal: null,
        errors: [{ message: `There is already a meal with date "${date}"` }],
      };
    }

    const recipe = await prisma.recipe.findUnique({ where: { id: recipeId } });

    if (recipe === null) {
      return {
        meal: null,
        errors: [{ message: `Recipe with id "${recipeId}" not found.` }],
      };
    }

    const chef = await prisma.chef.findUnique({ where: { id: chefId } });

    if (chef === null) {
      return {
        meal: null,
        errors: [{ message: `Chef with id "${recipeId}" not found.` }],
      };
    }

    const newMeal = await prisma.meal.create({
      data: {
        date: new Date(date),
        score,
        recipeId,
        chefId,
      },
    });

    return {
      meal: newMeal,
      errors: [],
    };
  },
};
