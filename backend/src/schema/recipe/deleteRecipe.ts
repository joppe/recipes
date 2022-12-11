import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Context } from '../../server';
import { RecipeMutationResult } from './RecipeMutationResult';
import { RecipeResultType } from './RecipeResultType';

type ResolveArgs = {
  id: string;
};

export const deleteRecipe = {
  type: RecipeResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _: unknown,
    { id }: ResolveArgs,
    { prisma }: Context,
  ): Promise<RecipeMutationResult> => {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id,
      },
    });

    if (recipe === null) {
      return {
        recipe: null,
        errors: [{ message: `Recipe with id "${id}" not found` }],
      };
    }

    await prisma.recipe.delete({
      where: {
        id,
      },
    });

    return {
      recipe: {
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
      },
      errors: [],
    };
  },
};
