import { Ingredient, Instruction, Meal, Media, Recipe } from '@prisma/client';
import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server/Context';
import { IngredientType } from '../ingredient';
import { InstructionType } from '../instruction';
import { MealType } from '../meal';
import { MediaType } from '../media';

export const RecipeType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Recipe',
  description: 'A recipe to cook a meal.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The record id of the recipe.',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the recipe.',
    },
    preparationTime: {
      type: GraphQLInt,
      description: 'The time in minutes to prepare the meal.',
    },
    cookingTime: {
      type: GraphQLInt,
      description: 'The time in minutes the whole cooking takes.',
    },
    difficulty: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'How difficult this recipe is on a scale from 0 to 5.',
    },
    course: {
      type: GraphQLString,
      description: 'For which course this recipe is best suited.',
    },
    servings: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The amount of people that can eat from this recipe.',
    },
    source: {
      type: GraphQLString,
      description: 'Where does this recipe come from.',
    },
    media: {
      type: MediaType,
      description: 'A video or image of the recipe.',
      resolve: async (
        recipe: Recipe,
        _: unknown,
        { mediaLoader }: Context,
      ): Promise<Media | null> => {
        if (recipe.mediaId === null) {
          return null;
        }

        return mediaLoader.load(recipe.mediaId);
      },
    },
    meals: {
      type: new GraphQLList(MealType),
      description: 'The list of meals that used this recipe.',
      resolve: async (
        recipe: Recipe,
        _: unknown,
        { prisma }: Context,
      ): Promise<Meal[]> => {
        return prisma.meal.findMany({
          where: { recipeId: recipe.id },
        });
      },
    },
    instructions: {
      type: new GraphQLList(InstructionType),
      description: 'The list of instructions for this recipe.',
      resolve: async (
        recipe: Recipe,
        _: unknown,
        { prisma }: Context,
      ): Promise<Instruction[]> => {
        return prisma.instruction.findMany({
          where: { recipeId: recipe.id },
        });
      },
    },
    ingredients: {
      type: new GraphQLList(IngredientType),
      description: 'The list of ingredients that are needed for this recipe.',
      resolve: async (
        recipe: Recipe,
        _: unknown,
        { prisma }: Context,
      ): Promise<Ingredient[]> => {
        return prisma.ingredient.findMany({
          where: { recipeId: recipe.id },
        });
      },
    },
  }),
});
