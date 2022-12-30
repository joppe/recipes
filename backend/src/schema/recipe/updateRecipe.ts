import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server/Context';
import { RecipeMutationResult } from './RecipeMutationResult';
import { RecipeResultType } from './RecipeResultType';

type ResolveArgs = {
  id: string;
  input: {
    name: string;
    preparationTime?: number;
    cookingTime?: number;
    difficulty: number;
    course?: string;
    servings: number;
    source?: string;
    mediaId?: string;
  };
};

const InputUpdateRecipeType = new GraphQLInputObjectType({
  name: 'UpdateRecipeInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    preparationTime: { type: GraphQLInt },
    cookingTime: { type: GraphQLInt },
    difficulty: { type: new GraphQLNonNull(GraphQLInt) },
    course: { type: GraphQLString },
    servings: { type: new GraphQLNonNull(GraphQLInt) },
    source: { type: GraphQLString },
    mediaId: { type: GraphQLID },
  },
});

export const updateRecipe = {
  type: RecipeResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: new GraphQLNonNull(InputUpdateRecipeType) },
  },
  resolve: async (
    _: unknown,
    { id, input }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<RecipeMutationResult> => {
    if (userInfo?.userId === undefined) {
      return {
        recipe: null,
        errors: [
          { message: 'User must be logged in to be able to do this action' },
        ],
      };
    }

    const {
      name,
      preparationTime,
      cookingTime,
      difficulty,
      course,
      servings,
      source,
      mediaId,
    } = input;

    const recipe = await prisma.recipe.findUnique({ where: { id } });

    if (recipe === null) {
      return {
        recipe: null,
        errors: [{ message: `Recipe with id "${id}" not found` }],
      };
    }

    if (mediaId !== undefined) {
      const media = await prisma.media.findUnique({
        where: {
          id: mediaId,
        },
      });

      if (media === null) {
        return {
          recipe: null,
          errors: [{ message: `Media with id "${mediaId}" not found.` }],
        };
      }
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        name,
        preparationTime: preparationTime ?? null,
        cookingTime: cookingTime ?? null,
        difficulty,
        course: course ?? null,
        servings,
        source: source ?? null,
        mediaId: mediaId ?? null,
      },
    });

    return {
      recipe: updatedRecipe,
      errors: [],
    };
  },
};
