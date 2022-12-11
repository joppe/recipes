import { GraphQLList } from 'graphql';

import { Context } from '../../server';
import { Recipe } from '../../types/Recipe';
import { RecipeType } from './RecipeType';

export const recipes = {
  type: new GraphQLList(RecipeType),
  resolve: async (
    _: unknown,
    __: unknown,
    { prisma }: Context,
  ): Promise<Recipe[]> => {
    const results = await prisma.recipe.findMany();

    return results.map((result) => ({
      id: result.id,
      name: result.name,
      preparation_time: result.preparation_time,
      cooking_time: result.cooking_time,
      difficulty: result.difficulty,
      course: result.course,
      servings: result.servings,
      source: result.source,
      media: null,
      meals: [],
      instructions: [],
      ingredients: [],
    }));
  },
};
