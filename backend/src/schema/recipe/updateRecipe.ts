import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server';
import { Recipe } from '../../types';
import { RecipeMutationResult } from './RecipeMutationResult';
import { RecipeResultType } from './RecipeResultType';

type ResolveArgs = {
  id: string;
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

const inputUpdateRecipeType = new GraphQLInputObjectType({
  name: 'UpdateRecipeInput',
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

export const updateRecipe = {
  type: RecipeResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: new GraphQLNonNull(inputUpdateRecipeType) },
  },
  resolve: async (
    _: unknown,
    { id, input }: ResolveArgs,
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

    const recipe = await prisma.recipe.findUnique({ where: { id } });

    if (recipe === null) {
      return {
        recipe: null,
        errors: [{ message: `Recipe with id "${id}" not found` }],
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

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: payloadRecipe as Omit<
        Recipe,
        'media' | 'meals' | 'instructions' | 'ingredients'
      >,
    });

    return {
      recipe: {
        id: updatedRecipe.id,
        name: updatedRecipe.name,
        preparation_time: updatedRecipe.preparation_time ?? null,
        cooking_time: updatedRecipe.cooking_time ?? null,
        difficulty: updatedRecipe.difficulty,
        course: updatedRecipe.course ?? null,
        servings: updatedRecipe.servings,
        source: updatedRecipe.source ?? null,
        media: null,
        meals: [],
        instructions: [],
        ingredients: [],
      },
      errors: [],
    };
  },
};
