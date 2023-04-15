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

const InputCreateRecipeType = new GraphQLInputObjectType({
  name: 'CreateRecipeInput',
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

export const createRecipe = {
  type: RecipeResultType,
  args: {
    input: { type: new GraphQLNonNull(InputCreateRecipeType) },
  },
  resolve: async (
    _: unknown,
    { input }: ResolveArgs,
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

    const existingRecipe = await prisma.recipe.findFirst({
      where: {
        name,
      },
    });

    if (existingRecipe !== null) {
      return {
        recipe: null,
        errors: [
          { message: `There is already a recipe with the name "${name}"` },
        ],
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

    const newRecipe = await prisma.recipe.create({
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
      recipe: newRecipe,
      errors: [],
    };
  },
};
