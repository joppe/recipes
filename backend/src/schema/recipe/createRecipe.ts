import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server';
import { Recipe } from '../../types/Recipe';
import { RecipeMutationResult } from './RecipeMutationResult';
import { RecipeResultType } from './RecipeResultType';

type ResolveArgs = {
  input: {
    name: string;
    preparation_time?: number;
    cooking_time?: number;
    difficulty: number;
    course?: string;
    servings: number;
    source?: string;
  };
};

const inputCreateRecipeType = new GraphQLInputObjectType({
  name: 'CreateRecipeInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    preparation_time: { type: GraphQLInt },
    cooking_time: { type: GraphQLInt },
    difficulty: { type: new GraphQLNonNull(GraphQLInt) },
    course: { type: GraphQLString },
    servings: { type: new GraphQLNonNull(GraphQLInt) },
    source: { type: GraphQLString },
  },
});

export const createRecipe = {
  type: RecipeResultType,
  args: {
    input: { type: inputCreateRecipeType },
  },
  resolve: async (
    _: unknown,
    { input }: ResolveArgs,
    { prisma }: Context,
  ): Promise<RecipeMutationResult> => {
    const {
      name,
      preparation_time,
      cooking_time,
      difficulty,
      course,
      servings,
      source,
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

    const payloadRecipe: Partial<Recipe> = {
      name,
      difficulty,
      servings,
    };

    if (preparation_time !== undefined) {
      payloadRecipe['preparation_time'] = preparation_time;
    }

    if (cooking_time !== undefined) {
      payloadRecipe['cooking_time'] = cooking_time;
    }

    if (course !== undefined) {
      payloadRecipe['course'] = course;
    }

    if (source !== undefined) {
      payloadRecipe['source'] = source;
    }

    const newRecipe = await prisma.recipe.create({
      data: payloadRecipe as Omit<
        Recipe,
        'media' | 'meals' | 'instructions' | 'ingredients'
      >,
    });

    return {
      recipe: {
        id: newRecipe.id,
        name: newRecipe.name,
        preparation_time: newRecipe.preparation_time ?? null,
        cooking_time: newRecipe.cooking_time ?? null,
        difficulty: newRecipe.difficulty,
        course: newRecipe.course ?? null,
        servings: newRecipe.servings,
        source: newRecipe.source ?? null,
        media: null,
        meals: [],
        instructions: [],
        ingredients: [],
      },
      errors: [],
    };
  },
};
