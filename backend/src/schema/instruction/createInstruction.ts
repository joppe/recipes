import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server/Context';
import { InstructionMutationResult } from './InstructionMutationResult';
import { InstructionResultType } from './InstructionResultType';

type ResolveArgs = {
  input: {
    order: number;
    text: string;
    mediaId?: string;
    recipeId: string;
  };
};

const InputCreateInstructionType = new GraphQLInputObjectType({
  name: 'CreateInstructionInput',
  fields: {
    order: { type: new GraphQLNonNull(GraphQLInt) },
    text: { type: new GraphQLNonNull(GraphQLString) },
    mediaId: { type: GraphQLID },
    recipeId: { type: new GraphQLNonNull(GraphQLID) },
  },
});

export const createInstruction = {
  type: InstructionResultType,
  args: {
    input: { type: new GraphQLNonNull(InputCreateInstructionType) },
  },
  resolve: async (
    _: unknown,
    { input }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<InstructionMutationResult> => {
    if (userInfo?.userId === undefined) {
      return {
        instruction: null,
        errors: [
          { message: 'User must be logged in to be able to do this action' },
        ],
      };
    }

    const { order, text, recipeId, mediaId } = input;

    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (recipe === null) {
      return {
        instruction: null,
        errors: [{ message: `Recipe with id "${recipeId}" not found.` }],
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
          instruction: null,
          errors: [{ message: `Media with id "${mediaId}" not found.` }],
        };
      }
    }

    const newInstruction = await prisma.instruction.create({
      data: { order, text, mediaId: mediaId ?? null, recipeId },
    });

    return {
      instruction: newInstruction,
      errors: [],
    };
  },
};
