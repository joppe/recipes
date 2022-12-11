import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { Recipe } from '../../types/Recipe';
import { RecipeType } from './RecipeType';

type ResolveArgs = {
  id: string;
};

export const recipe = {
  type: RecipeType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma }: Context,
  ): Promise<Recipe | null> => {
    const recipe = await prisma.recipe.findUnique({ where: { id } });

    if (recipe === null) {
      return null;
    }

    return {
      id: recipe.id,
      name: recipe.name,
      preparation_time: recipe.preparation_time,
      cooking_time: recipe.cooking_time,
      difficulty: recipe.difficulty,
      course: recipe.course,
      servings: recipe.servings,
      source: recipe.source,
      media: null,
      meals: [],
      instructions: [],
      ingredients: [],
    };
  },
};
