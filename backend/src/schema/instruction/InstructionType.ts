import { Instruction, Media, Recipe } from '@prisma/client';
import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index';

import { Context } from '../../server';
import { MediaType } from '../media/MediaType';
import { RecipeType } from '../recipe/RecipeType';

export const InstructionType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Instruction',
  description: 'An instruction that is needed to cook a recipe.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The record id of the instruction.',
    },
    order: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Tells when this instruction needs to be done.',
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The actual instruction for the recipe.',
    },
    media: {
      type: MediaType,
      description: 'A video or image of the instruction.',
      resolve: async (
        instruction: Instruction,
        _: unknown,
        { mediaLoader }: Context,
      ): Promise<Media | null> => {
        if (instruction.mediaId === null) {
          return null;
        }

        return mediaLoader.load(instruction.mediaId);
      },
    },
    recipe: {
      type: new GraphQLNonNull(RecipeType),
      description: 'The recipe this instruction belongs to.',
      resolve: async (
        instruction: Instruction,
        _: unknown,
        { recipesLoader }: Context,
      ): Promise<Recipe> => {
        return recipesLoader.load(instruction.recipeId);
      },
    },
  }),
});
